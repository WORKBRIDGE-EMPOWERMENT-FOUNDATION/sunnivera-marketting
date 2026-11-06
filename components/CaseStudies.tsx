type CaseStudy = {
  id: string;
  title: string;
  clientLabel: string;
  service: string;
  location: string;
  year: number | null;
  requirement: string;
  role: string;
  outcome: string;
};

/** Published case studies from Sunivera CRM. Refreshed every 10 minutes; shows nothing if none or unreachable. */
async function load(): Promise<CaseStudy[]> {
  const base = (process.env.CRM_URL || "https://crm.suniveralogisticsltd.com").replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/api/public/case-studies`, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.caseStudies) ? data.caseStudies : [];
  } catch {
    return [];
  }
}

export default async function CaseStudies() {
  const studies = await load();
  if (!studies.length) return null;
  return (
    <div className="cases">
      {studies.map((study) => (
        <article key={study.id} className="case">
          <p className="case-meta">
            {[study.clientLabel, study.service, study.location, study.year]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <h3>{study.title}</h3>
          <dl>
            <div>
              <dt>The requirement</dt>
              <dd>{study.requirement}</dd>
            </div>
            <div>
              <dt>Our role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt>The outcome</dt>
              <dd>{study.outcome}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
