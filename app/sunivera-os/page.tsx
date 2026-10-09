import type { Metadata } from 'next'
import Link from 'next/link'
import StatusTrail from '@/components/StatusTrail'

export const metadata: Metadata = { title: 'Sunivera OS', description: 'One operating environment for clients, vendors, talent and internal teams. In development.', alternates: { canonical: '/sunivera-os' } }

export default function OS() {
  return (
    <main className="pg"><div className="wrap">
      <p className="kicker">Sunivera OS, in development</p>
      <h1>Every engagement has an owner, a deadline and a paper trail.</h1>
      <p className="sub">One environment for clients, vendors, talent and internal teams.</p>
      <StatusTrail />
      <div className="os">
        <article><h3>Client workspace</h3><p>Request services, monitor work and keep visibility.</p>
          <ul><li>Company profile</li><li>Compliance</li><li>Opportunities</li><li>Procurement</li><li>Projects</li><li>Invoices</li><li>Documents</li></ul></article>
        <article><h3>Execution network</h3><p>A structured ecosystem for suppliers, professionals and candidates.</p>
          <ul><li>Vendor registration</li><li>RFQs</li><li>Talent profiles</li><li>Vacancies</li><li>Verification</li><li>Deployment</li><li>Performance</li></ul></article>
      </div>
      <div className="acts" style={{ marginTop: 40 }}><Link className="btn ink" href="/#contact">Ask about early access</Link></div>
    </div></main>
  )
}
