import { and, desc, eq, sql } from 'drizzle-orm'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { db } from './db'
import { posts } from './schema'

export type Post = {
  id: number; slug: string; title: string; excerpt: string; featuredImage: string; body: string
  tags: string[]; status: string; date: string; html: string
}
export type PostInput = { id: number | null; slug: string; title: string; excerpt: string; featuredImage: string; tags: string; body: string; status: 'draft' | 'published' }

const render = (md: string) =>
  sanitizeHtml(marked.parse(md, { async: false }) as string, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt'] },
    allowedSchemes: ['http', 'https', 'mailto'],
  })

function toPost(r: typeof posts.$inferSelect, html = false): Post {
  return {
    id: r.id, slug: r.slug, title: r.title, excerpt: r.excerpt, featuredImage: r.featuredImage, body: r.body, status: r.status,
    tags: r.tags.split(',').map(t => t.trim()).filter(Boolean),
    date: (r.publishedAt ?? r.createdAt).toISOString().slice(0, 10),
    html: html ? render(r.body) : '',
  }
}

export const fmt = (d: string) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100)

// Public
export async function getPosts(): Promise<Post[]> {
  const rows = await db.select().from(posts).where(eq(posts.status, 'published')).orderBy(desc(posts.publishedAt))
  return rows.map(r => toPost(r))
}
export async function getPost(slug: string): Promise<Post | undefined> {
  const [r] = await db.select().from(posts).where(and(eq(posts.slug, slug), eq(posts.status, 'published'))).limit(1)
  return r && toPost(r, true)
}

// Admin
export async function getAllPosts(): Promise<Post[]> {
  const rows = await db.select().from(posts).orderBy(desc(posts.updatedAt))
  return rows.map(r => toPost(r))
}
export async function getPostById(id: number): Promise<Post | undefined> {
  const [r] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  return r && toPost(r)
}
export async function savePost(i: PostInput) {
  const fields = { slug: i.slug, title: i.title, excerpt: i.excerpt, featuredImage: i.featuredImage, tags: i.tags, body: i.body, status: i.status }
  if (i.id) {
    await db.update(posts).set({
      ...fields, updatedAt: new Date(),
      ...(i.status === 'published' ? { publishedAt: sql`coalesce(${posts.publishedAt}, now())` } : {}),
    }).where(eq(posts.id, i.id))
  } else {
    await db.insert(posts).values({ ...fields, publishedAt: i.status === 'published' ? new Date() : null })
  }
}
export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id))
}
