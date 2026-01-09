export default function PricingPage() {
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1>Pricing</h1>
      <p className="muted">Choose monthly or lifetime access.</p>

      <div className="featureGrid" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="cardTitle">Monthly</div>
          <div className="muted">Best for trying Structura.</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$9/mo</div>
          <ul className="list">
            <li>Appointments + reminders</li>
            <li>Quiet hours</li>
            <li>Business + personal mode</li>
          </ul>
        </div>

        <div className="card">
          <div className="cardTitle">Lifetime</div>
          <div className="muted">One-time payment. Yours forever.</div>
          <div style={{ fontSize: 34, fontWeight: 950, margin: "10px 0 6px" }}>$99</div>
          <ul className="list">
            <li>Everything in Monthly</li>
            <li>Priority updates</li>
            <li>No recurring bill</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
