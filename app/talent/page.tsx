import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Careers and talent', description: 'A verified talent network for employment, NYSC, internships and client deployments.', alternates: { canonical: '/talent' } }

export default function Talent() {
  return (
    <main className="pg"><div className="wrap">
      <p className="kicker">Careers and talent</p>
      <h1>Employment, NYSC, internships and deployment.</h1>
      <div className="prose">
        <p>Build a verified talent profile, discover openings, and enter the pipeline for Sunivera roles or client workforce requirements. The network is opening soon.</p>
        <h2>What it will include</h2>
        <ul><li>A verified profile</li><li>Openings matched to your skills</li><li>Deployment to client projects</li><li>Performance records</li></ul>
        <p>Until it opens, introduce yourself through the contact form and choose Workforce.</p>
      </div>
      <div className="acts" style={{ marginTop: 32 }}><Link className="btn ink" href="/#contact">Introduce yourself</Link></div>
    </div></main>
  )
}
