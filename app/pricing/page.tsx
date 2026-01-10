export default function PricingPage() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1>Pricing</h1>
      <p className="muted">Secure checkout by Stripe.</p>

      <div className="featureGrid" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="cardTitle">Structura Monthly</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$9/mo</div>
          <div style={{ marginTop: 14 }}>
            <a
              className="btn btnPrimary"
              href="/api/stripe/redirect/monthly"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Monthly
            </a>
          </div>
        </div>

        <div className="card">
          <div className="cardTitle">Structura Pro</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$19/mo</div>
          <div style={{ marginTop: 14 }}>
            <a
              className="btn btnPrimary"
              href="/api/stripe/redirect/pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go Pro
            </a>
          </div>
        </div>

        <div className="card">
          <div className="cardTitle">Structura Lifetime</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$99</div>
          <div style={{ marginTop: 14 }}>
            <a
              className="btn btnPrimary"
              href="/api/stripe/redirect/lifetime"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Lifetime
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
