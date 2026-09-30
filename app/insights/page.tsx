import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts, fmt } from '@/lib/posts'

export const revalidate = 60

export const metadata: Metadata = { title: 'Insights', description: 'Practical notes on procurement, compliance, projects and workforce from Sunivera.' }

export default async function Insights() {
  const posts = await getPosts()
  return (
    <main className="pg"><div className="wrap">
      <p className="kicker">Insights</p>
      <h1>Notes on procurement, compliance and delivery.</h1>
      {posts.length === 0 ? (
        <p className="sub">The first articles are on the way.</p>
      ) : (
        <div className="plist">
          {posts.map(p => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="prow">
              <time dateTime={p.date}>{fmt(p.date)}</time>
              <div><h2>{p.title}</h2><p>{p.excerpt}</p></div>
              <span aria-hidden>→</span>
            </Link>
          ))}
        </div>
      )}
    </div></main>
  )
}
