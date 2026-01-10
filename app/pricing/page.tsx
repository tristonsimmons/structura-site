"use client";

async function go(path: string) {
  const res = await fetch(path, { method: "POST" });
  const data = await res.json();
  if (data?.url) window.location.href = data.url;
  else alert("Stripe checkout did not return a URL. Check Vercel logs/env vars.");
}

export default function PricingPage() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1>Pricing</h1>
      <p className="muted">Choose monthly, pro, or lifetime access. Payments handled by Stripe (test mode).</p>

      <div className="featureGrid" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="cardTitle">Structura Monthly</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$9/mo</div>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => go("/api/stripe/checkout/monthly")}>
              Start Monthly
            </button>
          </div>
        </div>

        <div className="card">
          <div className="cardTitle">Structura Pro</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$19/mo</div>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => go("/api/stripe/checkout/pro")}>
              Go Pro
            </button>
          </div>
        </div>

        <div className="card">
          <div className="cardTitle">Structura Lifetime</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$99</div>
          <div style={{ marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={() => go("/api/stripe/checkout/lifetime")}>
              Buy Lifetime
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
