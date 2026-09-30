// One-off: npm run import:posts  (copies content/posts/*.md into the database)
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { db } from '../lib/db'
import { posts } from '../lib/schema'

const dir = path.join(process.cwd(), 'content', 'posts')

async function main() {
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.md')) : []
  for (const f of files) {
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
    const published = !data.draft
    await db.insert(posts).values({
      slug: f.replace(/\.md$/, ''),
      title: String(data.title ?? f),
      excerpt: String(data.excerpt ?? ''),
      body: content.trim(),
      tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
      status: published ? 'published' : 'draft',
      publishedAt: published && data.date ? new Date(data.date) : null,
    }).onConflictDoNothing({ target: posts.slug })
    console.log('imported', f)
  }
  process.exit(0)
}
main()
