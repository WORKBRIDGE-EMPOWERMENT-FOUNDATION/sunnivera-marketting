import PostForm from '@/components/admin/PostForm'

export default async function New({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (<><header className="editor-head"><div><p className="eyebrow">Posts / New post</p><h1>Create a new post</h1><p>Draft your story and publish it when it is ready.</p></div></header><PostForm error={error} /></>)
}
