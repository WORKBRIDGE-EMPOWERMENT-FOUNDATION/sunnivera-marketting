import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { db } from '@/lib/db'
import { contactInquiries } from '@/lib/schema'

export const runtime = 'nodejs'

// Best-effort rate limit (per server instance). Use Upstash/Vercel KV if you need a hard limit.
const hits = new Map<string, number[]>()
const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ')
const fail = (error: string, status: number) => NextResponse.json({ error }, { status })

/**
 * Hand the enquiry to Sunivera CRM, which opens a client request, assigns the named lead and
 * emails the client their reference. Server to server, signed with CRM_ENQUIRY_SECRET; the
 * enquiry is already stored and emailed here, so a CRM outage never loses it.
 */
async function forwardToCrm(enquiry: Record<string, unknown>): Promise<string | null> {
  const secret = process.env.CRM_ENQUIRY_SECRET
  if (!secret) return null
  const base = (process.env.CRM_URL || 'https://crm.suniveralogisticsltd.com').replace(/\/$/, '')
  try {
    const res = await fetch(`${base}/api/public/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error(`CRM did not accept the enquiry (${res.status}).`)
      return null
    }
    return typeof data.reference === 'string' ? data.reference : null
  } catch {
    console.error('CRM could not be reached; the enquiry is stored and emailed only.')
    return null
  }
}

export async function POST(req: Request) {
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return fail('Bad request.', 400) }

  if (b.website) return NextResponse.json({ ok: true }) // honeypot: bots fill this, humans never see it

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000)
  if (recent.length >= 3) return fail('Too many requests. Please try again in a few minutes.', 429)
  hits.set(ip, [...recent, now])

  const name = oneLine(clean(b.n, 120))
  const company = oneLine(clean(b.c, 160))
  const email = oneLine(clean(b.e, 200))
  const service = oneLine(clean(b.t, 60))
  const phone = oneLine(clean(b.p, 40))
  const message = clean(b.m, 4000)
  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return fail('Please add your name, a valid email and your requirement.', 400)
  }

  try {
    await db.insert(contactInquiries).values({ name, company, email, service, message })
  } catch {
    return fail('We could not save your message. Please try again.', 503)
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT || 465)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    try {
      await transporter.sendMail({
        from: CONTACT_FROM || `Sunivera Website <${SMTP_USER}>`,
        to: CONTACT_TO || 'hello@suniveralogisticsltd.com',
        replyTo: email,
        subject: `Enquiry: ${service} from ${name}`,
        text: `Name: ${name}\nCompany: ${company || '-'}\nEmail: ${email}\nPhone: ${phone || '-'}\nNeed: ${service}\n\n${message}`,
      })
    } catch {
      console.error('Contact inquiry was stored, but its email notification failed.')
    }
  }

  const elapsed = Number(b.elapsedMs)
  const reference = await forwardToCrm({
    name, email, company, phone, service, message,
    page: clean(b.page, 300),
    elapsedMs: Number.isFinite(elapsed) ? elapsed : null,
    trap: '',
    ip,
  })

  return NextResponse.json({ ok: true, reference })
}
