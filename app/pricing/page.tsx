"use client";

async function go(path: string) {
  try {
    const res = await fetch(path, { method: "POST" });

    const text = await res.text(); // always safe
    let data: any = null;

    try {
      data = JSON.parse(text);
    } catch {
      // Not JSON (likely HTML error page)
    }

    if (!res.ok) {
      alert(`Checkout API error (${res.status}). Response:\n\n${text.slice(0, 600)}`);
      return;
    }

    if (data?.url && typeof data.url === "string") {
      window.location.assign(data.url);
      return;
    }

    alert(
      `No checkout url returned.\n\nStatus: ${res.status}\nContent-Type: ${res.headers.get(
        "content-type"
      )}\n\nResponse:\n${text.slice(0, 600)}`
    );
  } catch (err: any) {
    alert(`Request failed: ${err?.message || String(err)}`);
  }
}

export default function PricingPage() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1>Pricing</h1>
      <p className="muted">
        Clicking a plan should open Stripe Checkout. If it doesn’t, you’ll see the exact API response.
      </p>

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
