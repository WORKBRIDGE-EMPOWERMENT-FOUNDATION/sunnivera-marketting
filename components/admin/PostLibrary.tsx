'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import DeleteButton from './DeleteButton'

type Filter = 'all' | 'published' | 'draft'

const readingTime = (body: string) => Math.max(1, Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 220))

export default function PostLibrary({ posts, action }: { posts: Post[]; action: (fd: FormData) => void | Promise<void> }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return posts.filter(post =>
      (filter === 'all' || post.status === filter) &&
      (!term || `${post.title} ${post.slug} ${post.tags.join(' ')}`.toLowerCase().includes(term))
    )
  }, [filter, posts, query])

  return (
    <section className="post-panel">
      <div className="post-panel-head">
        <div><h2>All posts</h2><p>{visible.length} of {posts.length} {posts.length === 1 ? 'article' : 'articles'}</p></div>
        <div className="post-tools">
          <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search posts</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search posts…" /></label>
          <div className="filter-tabs" aria-label="Filter posts">
            {(['all', 'published', 'draft'] as Filter[]).map(value => <button type="button" className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} key={value}>{value[0].toUpperCase() + value.slice(1)}</button>)}
          </div>
        </div>
      </div>
      {posts.length === 0 && <div className="empty"><h2>No posts yet</h2><p>Create your first insight and it will appear here.</p><Link className="admin-primary" href="/admin/new">Create post</Link></div>}
      {posts.length > 0 && visible.length === 0 && <div className="empty"><h2>No matching posts</h2><p>Try a different search or filter.</p></div>}
      {visible.map(post => (
        <article className="arow" key={post.id}>
          <div className="post-title"><h3>{post.title}</h3><small>/insights/{post.slug} · {readingTime(post.body)} min read</small></div>
          <span className={`pill ${post.status === 'published' ? 'pub' : ''}`}><i />{post.status === 'published' ? 'Published' : 'Draft'}</span>
          <small className="post-date">{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</small>
          <div className="post-actions">{post.status === 'published' && <Link className="view-link" href={`/insights/${post.slug}`} target="_blank">View ↗</Link>}<Link className="edit-link" href={`/admin/${post.id}`}>Edit</Link><DeleteButton id={post.id} action={action} /></div>
        </article>
      ))}
    </section>
  )
}
