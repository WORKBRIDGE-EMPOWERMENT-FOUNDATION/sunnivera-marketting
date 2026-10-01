import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { deletePostAction } from './actions'
import PostLibrary from '@/components/admin/PostLibrary'

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
      <PostLibrary posts={posts} action={deletePostAction} />
    </>
  )
}
