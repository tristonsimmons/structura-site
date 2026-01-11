export default function SuccessPage() {
  return (
    <div className="container" style={{ padding: "56px 0", maxWidth: 720 }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Payment successful ✅</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Thanks for subscribing to <b>Structura</b>.
        </p>

        <div style={{ marginTop: 18, lineHeight: 1.6 }}>
          <p>
            Next step: <b>log in</b> using the same email you used at checkout.
          </p>
          <p className="muted" style={{ marginTop: 8 }}>
            We use a secure email sign-in link (no password). Check your inbox (and spam).
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
          <a className="btn btnPrimary" href="/login">
            Log in to Structura
          </a>
          <a className="btn btnGhost" href="/app">
            Go to app
          </a>
          <a className="btn btnGhost" href="/pricing">
            Back to pricing
          </a>
        </div>

        <hr style={{ margin: "20px 0", opacity: 0.2 }} />

        <p className="muted" style={{ marginBottom: 0 }}>
          If you don’t see access right away, wait 10–30 seconds and refresh. Your subscription activates via Stripe webhooks.
        </p>
      </div>
    </div>
  );
}
