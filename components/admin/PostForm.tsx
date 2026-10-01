import { savePostAction } from '@/app/admin/actions'
import type { Post } from '@/lib/posts'

const errors: Record<string, string> = {
  missing: 'Please add a title.',
  slug: 'That web address (slug) is already used by another post.',
}

export default function PostForm({ post, error }: { post?: Post; error?: string }) {
  return (
    <>
      {error && <p className="msg err" role="alert">{errors[error] ?? 'Something went wrong.'}</p>}
      <form className="pf" action={savePostAction}>
        {post && <input type="hidden" name="id" value={post.id} />}
        <div className="editor-fields">
          <section className="editor-card">
            <div className="field-group"><label htmlFor="title">Post title</label><input id="title" name="title" required defaultValue={post?.title} placeholder="Enter a clear, compelling title" /></div>
            <div className="field-group"><label htmlFor="excerpt">Excerpt</label><p>A short summary shown on the insights page.</p><textarea id="excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt} placeholder="What is this post about?" /></div>
            <div className="field-group body-field"><label htmlFor="body">Body</label><p>Write your article using Markdown.</p><textarea id="body" className="md" name="body" defaultValue={post?.body} placeholder="Start writing your post…" /></div>
          </section>
          <aside className="publish-card">
            <h2>Publishing</h2>
            <div className="field-group"><label htmlFor="status">Status</label><select id="status" name="status" defaultValue={post?.status ?? 'draft'}><option value="draft">Draft — hidden</option><option value="published">Published — public</option></select></div>
            <div className="field-group"><label htmlFor="slug">Web address</label><p>Leave empty to create it from the title.</p><div className="slug-field"><span>/insights/</span><input id="slug" name="slug" defaultValue={post?.slug} placeholder="post-address" /></div></div>
            <div className="field-group"><label htmlFor="tags">Tags</label><p>Separate multiple tags with commas.</p><input id="tags" name="tags" defaultValue={post?.tags.join(', ')} placeholder="Procurement, Compliance" /></div>
            <button className="admin-primary save-button" type="submit">{post ? 'Save changes' : 'Save post'}</button>
          </aside>
        </div>
      </form>
    </>
  )
}
