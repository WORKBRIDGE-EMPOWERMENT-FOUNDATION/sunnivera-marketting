import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, fmt } from '@/lib/posts'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) return {}
  return { title: p.title, description: p.excerpt, openGraph: { title: p.title, description: p.excerpt, type: 'article', publishedTime: p.date } }
}

export default async function Post({ params }: Props) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) notFound()
  return (
    <main className="pg">
      <article className="wrap art">
        <Link href="/insights" className="back">← All insights</Link>
        <p className="kicker">{fmt(p.date)}</p>
        <h1>{p.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
        <div className="cta-inline">
          <p>Have a requirement like this?</p>
          <Link className="btn ink" href="/#contact">Discuss a project</Link>
        </div>
      </article>
    </main>
  )
}
