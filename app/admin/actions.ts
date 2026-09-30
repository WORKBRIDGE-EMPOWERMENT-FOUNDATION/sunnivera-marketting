'use server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { makeToken, verifyToken, safeEqual } from '@/lib/auth'
import { savePost, deletePost, slugify } from '@/lib/posts'

const tries = new Map<string, number[]>()

async function requireAdmin() {
  if (!(await verifyToken((await cookies()).get('admin')?.value))) redirect('/admin/login')
}

function refresh() {
  revalidatePath('/insights')
  revalidatePath('/insights/[slug]', 'page')
  revalidatePath('/sitemap.xml')
}

export async function login(fd: FormData) {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = (tries.get(ip) ?? []).filter(t => now - t < 10 * 60_000)
  if (recent.length >= 5) redirect('/admin/login?error=rate')
  tries.set(ip, [...recent, now])

  const pw = String(fd.get('password') ?? '')
  const real = process.env.ADMIN_PASSWORD
  if (!real || !safeEqual(pw, real)) redirect('/admin/login?error=1')
  ;(await cookies()).set('admin', await makeToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7,
  })
  redirect('/admin')
}

export async function logout() {
  ;(await cookies()).delete('admin')
  redirect('/admin/login')
}

export async function savePostAction(fd: FormData) {
  await requireAdmin()
  const id = Number(fd.get('id')) || null
  const title = String(fd.get('title') ?? '').trim()
  const slug = slugify(String(fd.get('slug') || title))
  const back = id ? `/admin/${id}` : '/admin/new'
  if (!title || !slug) redirect(`${back}?error=missing`)
  try {
    await savePost({
      id, title, slug,
      excerpt: String(fd.get('excerpt') ?? '').trim(),
      tags: String(fd.get('tags') ?? '').trim(),
      body: String(fd.get('body') ?? ''),
      status: fd.get('status') === 'published' ? 'published' : 'draft',
    })
  } catch {
    redirect(`${back}?error=slug`) // slug already used
  }
  refresh()
  redirect('/admin?saved=1')
}

export async function deletePostAction(fd: FormData) {
  await requireAdmin()
  const id = Number(fd.get('id'))
  if (id) await deletePost(id)
  refresh()
  redirect('/admin?deleted=1')
}
