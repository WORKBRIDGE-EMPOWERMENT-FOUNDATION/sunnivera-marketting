// Works in both the Edge middleware and Node (Web Crypto only).
const enc = new TextEncoder()

async function sign(v: string) {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not set')
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(v))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let r = 0
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return r === 0
}

export async function makeToken() {
  const exp = String(Date.now() + 7 * 864e5)
  return `${exp}.${await sign(exp)}`
}

export async function verifyToken(token?: string) {
  try {
    if (!token) return false
    const [exp, sig] = token.split('.')
    if (!exp || !sig || Number(exp) < Date.now()) return false
    return safeEqual(sig, await sign(exp))
  } catch { return false }
}
