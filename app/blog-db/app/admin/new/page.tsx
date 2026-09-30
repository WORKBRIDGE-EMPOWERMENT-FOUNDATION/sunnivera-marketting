import PostForm from '@/components/admin/PostForm'

export default async function New({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (<><h1 style={{ fontSize: '2.4rem', marginBottom: 20 }}>New post</h1><PostForm error={error} /></>)
}
