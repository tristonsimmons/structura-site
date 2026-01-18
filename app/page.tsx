export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "#";
  const signupUrl = process.env.NEXT_PUBLIC_SIGNUP_URL || appUrl;

  return (
    <div className="container">
      <section className="hero">
        <div className="pill">Dark mode first • Time zone auto-detect • Quiet reminders</div>
        <h1>Structure your time. Simplify your life.</h1>
        <p className="subhead">
          Structura is a smart appointment and reminder system for personal life and growing businesses —
          built to keep you focused, organized, and consistent.
        </p>

        <div className="ctaRow">
          <a className="btn btnPrimary" href={signupUrl}>Start Free</a>
          <a className="btn btnGhost" href="/pricing">View Pricing</a>
        </div>

        <div className="heroGrid">
          <div className="card">
            <div className="cardTitle">For Business</div>
            <ul className="list">
              <li>Service name + client</li>
              <li>Flexible appointment blocks</li>
              <li>Email + push reminders</li>
              <li>Revenue tracking (completed-only)</li>
            </ul>
          </div>

          <div className="card">
            <div className="cardTitle">For Personal</div>
            <ul className="list">
              <li>Time-block your day</li>
              <li>Automatic time zone handling</li>
              <li>Custom quiet hours</li>
              <li>Switch Personal ↔ Business anytime</li>
            </ul>
          </div>

          <div className="card">
            <div className="cardTitle">Built for consistency</div>
            <ul className="list">
              <li>Daily summary push (quiet if 0 blocks)</li>
              <li>Status tracking: Scheduled / Completed / Missed</li>
              <li>CSV export for reports</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>What you get</h2>
        <div className="featureGrid">
          {[
            ["Flexible Blocks", "Create appointments with any duration—perfect for services or time-blocking."],
            ["Smart Reminders", "Email + push reminders that respect your custom quiet hours."],
            ["Business Insights", "Track completed appointments and revenue. Export CSV when needed."],
            ["Clean UX", "Dark mode first, fast tabs, and simple workflows for busy people."],
          ].map(([title, desc]) => (
            <div className="card" key={title}>
              <div className="cardTitle">{title}</div>
              <div className="muted">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section ctaBottom">
        <h2>Ready to get structured?</h2>
        <p className="muted">Start free. Upgrade when it pays for itself.</p>
        <div className="ctaRow">
          <a className="btn btnPrimary" href={signupUrl}>Start Free</a>
          <a href="/app" className="btn btnGhost">Open app</a>
        </div>
      </section>
    </div>
  );
}
