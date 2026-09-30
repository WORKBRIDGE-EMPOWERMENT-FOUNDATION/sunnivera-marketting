import Link from "next/link";
import Ledger, { Item } from "@/components/Ledger";
import Route from "@/components/Route";
import Form from "@/components/Form";
import PhotoStrip from "@/components/PhotoStrip";
import Faq from "@/components/Faq";
import Birds from "@/components/Birds";   // with the other imports

const items: Item[] = [
  {
    name: "Procurement and sourcing",
    verbs: "Source, verify, acquire",
    text: "From tender intelligence to a verified supplier on site. We source, compare quotations and check every vendor before money moves.",
    scope: [
      "Tender intelligence",
      "RFQs",
      "Quotation analysis",
      "Vendor due diligence",
      "Bid support",
    ],
  },
  {
    name: "Compliance",
    verbs: "Prepare, monitor, maintain",
    text: "The paperwork that decides whether you can bid, trade or renew, kept current instead of rushed.",
    scope: [
      "Corporate documentation",
      "Statutory filings",
      "Certifications",
      "Renewals",
      "Vendor readiness",
    ],
  },
  {
    name: "Projects and contracts",
    verbs: "Mobilise, control, deliver",
    text: "One accountable team from mobilisation to closeout, with records that stand up to audit.",
    scope: [
      "Mobilisation",
      "Project controls",
      "Reporting",
      "Documentation",
      "Closeout",
    ],
  },
  {
    name: "Workforce",
    verbs: "Recruit, deploy, manage",
    text: "Verified people placed where the work is, and managed after they arrive.",
    scope: [
      "Recruitment",
      "Candidate verification",
      "Deployment",
      "Performance management",
    ],
  },
  {
    name: "Technology",
    verbs: "Connect, automate, measure, security",
    text: "Systems shaped around how your operation really runs, not the other way round.",
    scope: [
      "Digital workflows",
      "Automation",
      "Data visibility",
      "Cyber security",
    ],
  },
  {
    name: "Logistics and supply chain",
    verbs: "Coordinate, supply, move, deliver.",
    text: "We provide reliable logistics and supply-chain support for organisations, projects and field operations—from vehicle hire and fuel supply to materials, equipment and last-mile delivery.",
    scope: [
      "Vehicle Hire & Fleet Support",
      "Diesel & Fuel Supply",
      "Materials & Equipment Logistics",
      "Supplier Coordination",
      "Delivery & Distribution Management",
      "Project & Field Logistics",
    ],
  },
];

export default function Home() {
  return (
    <>
      <main id="top">
        <section className="hero">
          <Birds /> 
          <div className="wrap">
            <p className="kicker">
              Business execution infrastructure for Africa
            </p>
            <h1>
              <span>
                <em>We turn requirements</em>
              </span>
              <span>
                <em>into reliable</em>
              </span>
              <span className="band">
                <em>execution.</em>
              </span>
            </h1>
            <div className="hero-foot">
              <p>
                Procurement, compliance, projects, workforce and technology
                under one accountable partner, so you mobilise faster and
                deliver with control.
              </p>
              <div className="acts">
                <a className="btn ink" href="#contact">
                  Request a service
                </a>
                <a className="btn line" href="#work">
                  See capabilities
                </a>
              </div>
            </div>
            <dl className="docket" aria-label="Sample engagement">
              <div>
                <dt>Requirement</dt>
                <dd>Supply, install, commission</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>Named lead, day one</dd>
              </div>
              <div>
                <dt>Deadline</dt>
                <dd>Fixed at structuring</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  In execution <span className="stamp">Sample</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* <PhotoStrip /> */}

        <section id="work" className="sec">
          <div className="wrap split">
            <div>
              <h2>Six disciplines. One owner for the outcome.</h2>
              <p className="sub">
                Each can run alone. Together they carry a project, a contract or
                a recurring requirement from first enquiry to closeout.
              </p>
            </div>
            <Ledger items={items} />
          </div>
        </section>

        <section id="method" className="sec deep">
          <div className="wrap">
            <h2>From opportunity to execution.</h2>
            <p className="sub">
              Every engagement travels the same route, so delivery never depends
              on heroics.
            </p>
            <Route />
          </div>
        </section>

        <section id="os" className="sec teaser">
          <div className="wrap split">
            <h2>
              Sunivera OS: every engagement has an owner, a deadline and a paper
              trail.
            </h2>
            <div>
              <p className="sub" style={{ marginTop: 0 }}>
                One environment for clients, vendors, talent and internal teams.
                In development.
              </p>
              <div className="acts" style={{ marginTop: 24 }}>
                <Link className="btn ink" href="/sunivera-os">
                  See what Sunivera OS will do
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="board" className="sec sun">
          <div className="wrap">
            <h2>A reason to return, not just a reason to visit.</h2>
            <p className="sub">
              Tenders, RFQs, EOIs, grants and partnerships, with eligibility
              review, deadline tracking and bid support. Plus a verified talent
              network for NYSC, internships and deployment.
            </p>
            <div className="acts" style={{ marginTop: 28 }}>
              <Link className="btn ink" href="/opportunities">
                Explore opportunities
              </Link>
              <Link className="btn line" href="/talent">
                Join the talent network
              </Link>
            </div>
          </div>
        </section>

        <section id="proof" className="sec">
          <div className="wrap">
            <h2>Evidence over exaggeration.</h2>
            <p className="sub">
              Every project is shown as the requirement, our exact role and the
              outcome. Where we support a prime contractor, we say so.
            </p>
            <div className="proof">
              <article>
                <h3>The requirement</h3>
                <p>
                  What the client needed, the constraints and the objective.
                </p>
              </article>
              <article>
                <h3>Our role</h3>
                <p>
                  Exactly what Sunivera owned across procurement, compliance,
                  logistics, workforce, technology or project support.
                </p>
              </article>
              <article>
                <h3>The outcome</h3>
                <p>
                  Verifiable delivery, documents and measurable results, where
                  disclosure is permitted.
                </p>
              </article>
            </div>
            {/* <div className="slot">Verified case study goes here</div> */}
          </div>
        </section>

        <Faq />

        <section id="contact" className="sec cta">
          <div className="wrap split">
            <h2>
              Have an enquiry that needs structure, mobilisation or delivery?
            </h2>
            <Form />
          </div>
        </section>
      </main>
    </>
  );
}
