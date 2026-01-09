import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Structura — Schedule. Remind. Stay on track.",
  description:
    "Structura is a smart appointment and reminder system for personal life and growing businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "#";

  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="container navInner">
            <a href="/" className="brand">Structura</a>
            <nav className="navLinks">
              <a href="/pricing">Pricing</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href={appUrl} className="btn btnGhost">Open App</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="container footerInner">
            <div className="muted">© {new Date().getFullYear()} Structura</div>
            <div className="navLinks">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
