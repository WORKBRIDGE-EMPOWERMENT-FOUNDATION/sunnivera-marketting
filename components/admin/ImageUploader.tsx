'use client'

import { useRef, useState } from 'react'

export default function ImageUploader({ label, onUploaded }: { label: string; onUploaded: (url: string, alt: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function upload(file: File) {
    setUploading(true)
    setError('')
    const form = new FormData()
    form.append('file', file)
    try {
      const response = await fetch('/api/admin/images', { method: 'POST', body: form, credentials: 'same-origin' })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Upload failed.')
      const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
      onUploaded(result.url, alt)
      if (inputRef.current) inputRef.current.value = ''
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="image-uploader">
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={event => { const file = event.target.files?.[0]; if (file) void upload(file) }} />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}>{uploading ? 'Uploading…' : label}</button>
      <small>JPG, PNG, WebP or GIF · max 8 MB</small>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}
