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
        <label>Title<input name="title" required defaultValue={post?.title} /></label>
        <div className="row2">
          <label>Web address (slug), optional<input name="slug" defaultValue={post?.slug} placeholder="made-from-title-if-empty" /></label>
          <label>Status
            <select name="status" defaultValue={post?.status ?? 'draft'}>
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
        <label>Excerpt<textarea name="excerpt" rows={2} defaultValue={post?.excerpt} /></label>
        <label>Tags, comma separated<input name="tags" defaultValue={post?.tags.join(', ')} /></label>
        <label>Body (Markdown)<textarea className="md" name="body" defaultValue={post?.body} /></label>
        <div className="acts"><button className="btn ink" type="submit">Save post</button></div>
      </form>
    </>
  )
}
