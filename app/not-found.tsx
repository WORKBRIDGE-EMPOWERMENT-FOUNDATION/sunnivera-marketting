export default function NotFound() {
  return (
    <main className="nf">
      <div className="wrap">
        <p className="kicker">Error 404</p>
        <h1>This stop is not on the route.</h1>
        <p className="sub">The page you asked for does not exist or has moved.</p>
        <div className="acts" style={{ marginTop: 32 }}>
          <a className="btn ink" href="/">Back to the homepage</a>
          <a className="btn" href="/#contact">Discuss a project</a>
        </div>
      </div>
    </main>
  )
}
