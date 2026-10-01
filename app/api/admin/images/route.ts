import { randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function POST(request: Request) {
  if ((await headers()).get('x-sunivera-admin') !== 'verified') {
    return NextResponse.json({ error: 'Your admin session has expired. Please sign in again.' }, { status: 401 })
  }
  const supabase = await createSupabaseServerClient()
  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 })
  if (!allowedTypes.has(file.type)) return NextResponse.json({ error: 'Use a JPG, PNG, WebP or GIF image.' }, { status: 400 })
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'Images must be smaller than 8 MB.' }, { status: 400 })

  const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const path = `${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('blog-images').upload(path, file, { contentType: file.type, cacheControl: '31536000' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl })
}
