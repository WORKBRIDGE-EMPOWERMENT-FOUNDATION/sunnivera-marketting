'use client'

import { useMemo } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { marked } from 'marked'
import ImageUploader from './ImageUploader'

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const initialContent = useMemo(() => marked.parse(value, { async: false }) as string, [value])
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
    ],
    content: initialContent,
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  })

  if (!editor) return <div className="rich-loading">Loading editor…</div>
  const activeEditor = editor

  function setLink() {
    const previous = activeEditor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL', previous ?? 'https://')
    if (url === null) return
    if (!url.trim()) activeEditor.chain().focus().extendMarkRange('link').unsetLink().run()
    else activeEditor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run()
  }

  const button = (label: string, active: boolean, action: () => void, title?: string) => (
    <button type="button" className={active ? 'active' : ''} onClick={action} title={title ?? label}>{label}</button>
  )

  return (
    <div className="rich-editor">
      <div className="rich-toolbar" role="toolbar" aria-label="Text formatting">
        {button('B', editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), 'Bold')}
        {button('I', editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), 'Italic')}
        {button('H2', editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), 'Heading')}
        {button('H3', editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), 'Subheading')}
        {button('• List', editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run())}
        {button('1. List', editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run())}
        {button('Quote', editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run())}
        {button('Link', editor.isActive('link'), setLink)}
        <span className="toolbar-spacer" />
        {button('↶', false, () => editor.chain().focus().undo().run(), 'Undo')}
        {button('↷', false, () => editor.chain().focus().redo().run(), 'Redo')}
        <ImageUploader label="Add image" onUploaded={(url, alt) => editor.chain().focus().setImage({ src: url, alt }).run()} />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
