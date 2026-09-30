'use server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { isAdminEmail } from '@/lib/admin-auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { savePost, deletePost, slugify } from '@/lib/posts'

const tries = new Map<string, number[]>()

async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isAdminEmail(user.email)) redirect('/admin/login')
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

  const email = String(fd.get('email') ?? '').trim().toLowerCase()
  const password = String(fd.get('password') ?? '')
  if (!email || !password || !isAdminEmail(email)) redirect('/admin/login?error=1')

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/admin/login?error=1')
  redirect('/admin')
}

export async function logout() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
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
