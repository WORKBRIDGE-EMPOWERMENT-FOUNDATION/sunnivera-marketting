'use client'

import { useState } from 'react'
import { savePostAction } from '@/app/admin/actions'
import type { Post } from '@/lib/posts'
import ImageUploader from './ImageUploader'
import RichTextEditor from './RichTextEditor'

const errors: Record<string, string> = {
  missing: 'Please add a title.',
  slug: 'That web address (slug) is already used by another post.',
}

export default function PostForm({ post, error }: { post?: Post; error?: string }) {
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage ?? '')
  const [body, setBody] = useState(post?.body ?? '')

  return (
    <>
      {error && <p className="msg err" role="alert">{errors[error] ?? 'Something went wrong.'}</p>}
      <form className="pf" action={savePostAction}>
        {post && <input type="hidden" name="id" value={post.id} />}
        <div className="editor-fields">
          <section className="editor-card">
            <div className="field-group"><label htmlFor="title">Post title</label><input id="title" name="title" required defaultValue={post?.title} placeholder="Enter a clear, compelling title" /></div>
            <div className="field-group"><label htmlFor="excerpt">Excerpt</label><p>A short summary shown on the insights page.</p><textarea id="excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt} placeholder="What is this post about?" /></div>
            <div className="field-group banner-field">
              <label>Featured banner</label><p>Shown at the top of the article and in its social preview.</p>
              <input type="hidden" name="featuredImage" value={featuredImage} />
              {featuredImage ? <div className="banner-preview"><img src={featuredImage} alt="Featured banner preview" /><button type="button" onClick={() => setFeaturedImage('')}>Remove</button></div> : <div className="banner-placeholder"><span aria-hidden="true">◇</span><p>Add a wide image for the post</p></div>}
              <ImageUploader label={featuredImage ? 'Replace banner' : 'Upload banner'} onUploaded={(url) => setFeaturedImage(url)} />
            </div>
            <div className="field-group body-field"><label>Body</label><p>Format your article visually and add images wherever you need them.</p><input type="hidden" name="body" value={body} /><RichTextEditor value={post?.body ?? ''} onChange={setBody} /></div>
          </section>
          <aside className="publish-card">
            <h2>Publishing</h2>
            <div className="field-group"><label htmlFor="status">Status</label><select id="status" name="status" defaultValue={post?.status ?? 'draft'}><option value="draft">Draft — hidden</option><option value="published">Published — public</option></select></div>
            <div className="field-group"><label htmlFor="slug">Web address</label><p>Leave empty to create it from the title.</p><div className="slug-field"><span>/insights/</span><input id="slug" name="slug" defaultValue={post?.slug} placeholder="post-address" /></div></div>
            <div className="field-group"><label htmlFor="tags">Tags</label><p>Separate multiple tags with commas.</p><input id="tags" name="tags" defaultValue={post?.tags.join(', ')} placeholder="Procurement, Compliance" /></div>
            <button className="admin-primary save-button" type="submit">{post ? 'Save changes' : 'Save post'}</button>
            {post?.status === 'published' && <a className="preview-link" href={`/insights/${post.slug}`} target="_blank" rel="noreferrer">View published post ↗</a>}
          </aside>
        </div>
      </form>
    </>
  )
}
