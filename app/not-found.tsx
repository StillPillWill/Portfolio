import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 · Page Not Found · William Nzive",
};

export default function NotFound() {
  return (
    <main className="project-page" id="main">
      <header className="site-header project-site-header">
        <a href="/" className="wordmark" aria-label="William Nzive home">
          <span className="wordmark-mark">WN</span>
          <span>William Nzive</span>
        </a>
        <a href="/" className="back-to-work">
          ← Return to home
        </a>
      </header>

      <section className="section-wrap" style={{ paddingTop: "120px", paddingBottom: "120px", textAlign: "center" }}>
        <p className="eyebrow eyebrow-accent">404 · Route Not Found</p>
        <h1 className="display" style={{ marginTop: "16px" }}>Page not found.</h1>
        <p style={{ maxWidth: "48ch", margin: "20px auto 36px", color: "var(--text-2)", fontSize: "16px", lineHeight: "1.6" }}>
          The requested page could not be found. You can return to the homepage or explore all selected engineering projects.
        </p>
        <div style={{ display: "inline-flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/" className="button button-solid">
            Return to Home →
          </a>
          <a href="/projects" className="button button-ghost">
            View All Projects →
          </a>
        </div>
      </section>
    </main>
  );
}
