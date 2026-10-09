import type { Metadata } from 'next'
import Link from 'next/link'
import Board from '@/components/Board'

export const metadata: Metadata = { title: 'Opportunities', description: 'Tenders, RFQs, EOIs, grants and partnerships, with eligibility review, deadline tracking and bid support.', alternates: { canonical: '/opportunities' } }

export default function Opportunities() {
  return (
    <main className="pg"><div className="wrap split">
      <div>
        <p className="kicker">Sunivera Intelligence</p>
        <h1 style={{ fontSize: 'clamp(2.4rem,5.5vw,4.6rem)' }}>Tenders, RFQs, EOIs, grants and partnerships.</h1>
        <p className="sub">We find the opportunity, review your eligibility, track the deadline, prepare the document checklist and support the bid.</p>
        <p className="sub">Live opportunity alerts are coming. Tell us what you look for and we will add you to the list.</p>
        <div className="acts" style={{ marginTop: 28 }}><Link className="btn ink" href="/#contact">Tell us what you look for</Link><Link className="btn" href="/talent">Talent network</Link></div>
      </div>
      <Board />
    </div></main>
  )
}
