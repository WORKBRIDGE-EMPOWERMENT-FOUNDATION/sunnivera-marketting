import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'About', description: 'Sunivera Logistics Limited is a business execution partner across procurement, compliance, projects, workforce and technology.' }

// Replace every [bracketed] value with verified details before launch.
export default function About() {
  return (
    <main className="pg"><div className="wrap">
      <p className="kicker">About Sunivera</p>
      <h1>An execution partner, not a collection of services.</h1>
      <div className="prose">
        <p>Sunivera Logistics Limited connects procurement, compliance, projects, workforce and technology, so organisations can mobilise faster, operate with control and deliver with accountability.</p>
        <h2>How we work</h2>
        <p>Every engagement has one accountable owner, a fixed deadline and a documented trail. We follow the same seven-step route each time, and we show our exact role on every project, including where we support a prime contractor or partner.</p>
      </div>
      <dl className="facts">
        <div><dt>Legal name</dt><dd>Sunivera Logistics Limited</dd></div>
        <div><dt>Registration number</dt><dd>[Company registration number]</dd></div>
        <div><dt>Registered office</dt><dd>[Registered address]</dd></div>
        <div><dt>Where we operate</dt><dd>[Countries and regions]</dd></div>
        <div><dt>Leadership</dt><dd>[Name, title]</dd></div>
        <div><dt>Contact</dt><dd><a href="mailto:hello@suniveralogisticsltd.com">hello@suniveralogisticsltd.com</a></dd></div>
      </dl>
      <div className="acts" style={{ marginTop: 40 }}><Link className="btn ink" href="/#contact">Discuss a project</Link></div>
    </div></main>
  )
}
