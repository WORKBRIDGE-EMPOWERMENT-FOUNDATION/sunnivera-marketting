const faqs = [
  ['Who do you work with?', 'Organisations that need something delivered, from a single procurement to a full contract: companies bidding for work, project owners, and teams hiring at scale.'],
  ['Can I use one service without the others?', 'Yes. Each discipline can run on its own. They combine when a project needs them to.'],
  ['How does an engagement start?', 'You send the requirement. We qualify it for eligibility, cost, capability and risk, then structure the approach and agree scope, owner and deadline before we mobilise.'],
  ['How do you check vendors and candidates?', 'Vendor due diligence and candidate verification are built into the procurement and workforce work. The checks are agreed for each engagement.'],
  ['How is pricing agreed?', 'Commercial terms are set at the structuring stage, once scope is clear, so you know them before work starts.'],
  ['Do you support prime contractors and partners?', 'Yes. Where we support a prime contractor or partner, we state that role precisely.'],
]

export default function Faq() {
  return (
    <section id="faq" className="sec">
      <div className="wrap split">
        <div>
          <h2>Questions buyers ask first.</h2>
          <p className="sub">Short answers. For anything specific to your requirement, ask us directly.</p>
        </div>
        <div className="faq">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
