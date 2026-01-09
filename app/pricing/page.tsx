"use client";

async function go(path: string) {
  const res = await fetch(path, { method: "POST" });
  const data = await res.json();
  if (data?.url) window.location.href = data.url;
}

export default function PricingPage() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1>Pricing</h1>
      <p className="muted">Choose monthly, pro, or lifetime access. (You can test later in Stripe Test Mode.)</p>

      <div className="featureGrid" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="cardTitle">Structura Monthly</div>
          <div className="muted">Best for individuals starting out.</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$9/mo</div>
          <ul className="list">
            <li>Appointments + reminders</li>
            <li>Quiet hours</li>
            <li>Business + personal mode</li>
          </ul>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => go("/api/stripe/checkout/monthly")}>
              Start Monthly
            </button>
          </div>
        </div>

        <div className="card">
          <div className="cardTitle">Structura Pro</div>
          <div className="muted">Built for business and higher volume.</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$19/mo</div>
          <ul className="list">
            <li>Everything in Monthly</li>
            <li>Advanced insights (coming soon)</li>
            <li>Priority updates</li>
          </ul>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => go("/api/stripe/checkout/pro")}>
              Go Pro
            </button>
          </div>
        </div>

        <div className="card">
          <div className="cardTitle">Structura Lifetime</div>
          <div className="muted">One-time payment. Yours forever.</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$99</div>
          <ul className="list">
            <li>Everything in Monthly</li>
            <li>No recurring bill</li>
            <li>Best long-term value</li>
          </ul>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => go("/api/stripe/checkout/lifetime")}>
              Buy Lifetime
            </button>
          </div>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 18 }}>
        Payments are handled securely by Stripe.
      </p>
    </div>
  );
}
