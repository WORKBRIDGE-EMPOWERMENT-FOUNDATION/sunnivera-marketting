import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/posts'
import PostForm from '@/components/admin/PostForm'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }

export default async function Edit({ params, searchParams }: Props) {
  const [{ id }, { error }] = await Promise.all([params, searchParams])
  const post = await getPostById(Number(id))
  if (!post) notFound()
  return (<><header className="editor-head"><div><p className="eyebrow">Posts / Edit post</p><h1>Edit post</h1><p>Update the article content and publishing details.</p></div></header><PostForm post={post} error={error} /></>)
}
