import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, fmt } from '@/lib/posts'
import { absoluteUrl, companyName } from '@/lib/site'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/insights/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, type: 'article', url: `/insights/${p.slug}`, publishedTime: p.date, images: p.featuredImage ? [p.featuredImage] : undefined },
  }
}

export default async function Post({ params }: Props) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) notFound()
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    mainEntityOfPage: absoluteUrl(`/insights/${p.slug}`),
    image: p.featuredImage || undefined,
    author: { '@type': 'Organization', name: companyName },
    publisher: { '@type': 'Organization', name: companyName, logo: { '@type': 'ImageObject', url: absoluteUrl('/sunnivera-logo.png') } },
  }
  return (
    <main className="pg">
      <article className="wrap art">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Link href="/insights" className="back">← All insights</Link>
        <p className="kicker">{fmt(p.date)}</p>
        <h1>{p.title}</h1>
        {p.featuredImage && <img className="article-banner" src={p.featuredImage} alt={`Featured image for ${p.title}`} />}
        <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
        <div className="cta-inline">
          <p>Have a requirement like this?</p>
          <Link className="btn ink" href="/#contact">Discuss a project</Link>
        </div>
      </article>
    </main>
  )
}
