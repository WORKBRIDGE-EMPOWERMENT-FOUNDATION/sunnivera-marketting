import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy', description: 'How Sunivera Logistics Limited handles information you send through this website.', alternates: { canonical: '/privacy' } }

// Draft. Have it reviewed against the data protection law that applies to you before launch, and fill in the [brackets].
export default function Privacy() {
  return (
    <main className="pg"><div className="wrap">
      <p className="kicker">Privacy</p>
      <h1>How we handle your information.</h1>
      <div className="prose">
        <p>Last updated: September 2026. This page explains what Sunivera Logistics Limited collects through this website and why.</p>
        <h2>What we collect</h2>
        <p>When you use the contact form we receive your name, work email, company, the type of service you need, and your message. We collect only what you type into the form.</p>
        <h2>Why we use it</h2>
        <p>We use it to reply to your enquiry and to scope the work you ask about. We do not sell your information or use it for unrelated marketing.</p>
        <h2>Who sees it</h2>
        <p>Your message is sent to our business email and read by our team. We may share it with a supplier or partner only where you ask us to, or where an engagement needs it.</p>
        <h2>How long we keep it</h2>
        <p>We keep enquiries for [retention period], or longer if an engagement follows.</p>
        <h2>Your rights</h2>
        <p>You can ask us to show, correct or delete the information we hold about you. Write to <a href="mailto:hello@suniveralogisticsltd.com">hello@suniveralogisticsltd.com</a>.</p>
        <h2>Cookies and analytics</h2>
        <p>[State whether the site uses cookies or analytics. If it does not, say so here.]</p>
      </div>
    </div></main>
  )
}
