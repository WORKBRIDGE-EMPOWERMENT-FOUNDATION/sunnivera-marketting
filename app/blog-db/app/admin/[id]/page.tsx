import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/posts'
import PostForm from '@/components/admin/PostForm'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }

export default async function Edit({ params, searchParams }: Props) {
  const [{ id }, { error }] = await Promise.all([params, searchParams])
  const post = await getPostById(Number(id))
  if (!post) notFound()
  return (<><h1 style={{ fontSize: '2.4rem', marginBottom: 20 }}>Edit post</h1><PostForm post={post} error={error} /></>)
}
