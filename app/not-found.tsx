import { Arrow, SiteFooter } from "./components/blocks";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="page page-404">
        <p className="label mono">404</p>
        <h1 className="page-title">
          Page not found
        </h1>
        <p>The link may be old, or the page moved.</p>
        <div className="hero-cta">
          <a className="btn" href="/">
            Back home <Arrow dir="e" />
          </a>
          <a className="link" href="/projects">
            All projects
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
