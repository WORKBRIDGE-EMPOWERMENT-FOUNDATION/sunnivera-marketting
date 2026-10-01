import Link from 'next/link'
import { getAllPosts, fmt } from '@/lib/posts'
import { deletePostAction } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function Admin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const [{ saved, deleted }, posts] = await Promise.all([searchParams, getAllPosts()])
  const published = posts.filter(post => post.status === 'published').length
  const drafts = posts.length - published
  return (
    <>
      <header className="admin-head">
        <div><p className="eyebrow">Content</p><h1>Posts</h1><p>Write, manage and publish your insights.</p></div>
        <Link className="admin-primary" href="/admin/new"><span aria-hidden="true">＋</span> Create new post</Link>
      </header>
      {saved && <p className="msg" role="status">Post saved successfully.</p>}
      {deleted && <p className="msg" role="status">Post deleted.</p>}
      <div className="admin-stats" aria-label="Post summary">
        <div><span>All posts</span><strong>{posts.length}</strong></div>
        <div><span>Published</span><strong>{published}</strong></div>
        <div><span>Drafts</span><strong>{drafts}</strong></div>
      </div>
      <section className="post-panel">
        <div className="post-panel-head"><div><h2>All posts</h2><p>{posts.length} {posts.length === 1 ? 'article' : 'articles'} in your library</p></div></div>
        {posts.length === 0 && <div className="empty"><h2>No posts yet</h2><p>Create your first insight and it will appear here.</p><Link className="admin-primary" href="/admin/new">Create post</Link></div>}
        {posts.map(p => (
          <article className="arow" key={p.id}>
            <div className="post-title"><h3>{p.title}</h3><small>/insights/{p.slug}</small></div>
            <span className={`pill ${p.status === 'published' ? 'pub' : ''}`}><i />{p.status === 'published' ? 'Published' : 'Draft'}</span>
            <small className="post-date">{fmt(p.date)}</small>
            <div className="post-actions"><Link className="edit-link" href={`/admin/${p.id}`}>Edit</Link><DeleteButton id={p.id} action={deletePostAction} /></div>
          </article>
        ))}
      </section>
    </>
  )
}
