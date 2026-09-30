import Link from 'next/link'
import { getAllPosts, fmt } from '@/lib/posts'
import { deletePostAction } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'

export const dynamic = 'force-dynamic'

export default async function Admin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const [{ saved, deleted }, posts] = await Promise.all([searchParams, getAllPosts()])
  return (
    <>
      {saved && <p className="msg">Post saved.</p>}
      {deleted && <p className="msg">Post deleted.</p>}
      <div className="acts" style={{ marginBottom: 24 }}><Link className="btn ink" href="/admin/new">New post</Link></div>
      {posts.length === 0 && <p className="sub">No posts yet.</p>}
      {posts.map(p => (
        <div className="arow" key={p.id}>
          <div><h2>{p.title}</h2><small>/insights/{p.slug}</small></div>
          <span className={`pill ${p.status === 'published' ? 'pub' : ''}`}>{p.status === 'published' ? 'Published' : 'Draft'}</span>
          <small>{fmt(p.date)}</small>
          <Link className="lnk" href={`/admin/${p.id}`}>Edit</Link>
          <DeleteButton id={p.id} action={deletePostAction} />
        </div>
      ))}
    </>
  )
}
