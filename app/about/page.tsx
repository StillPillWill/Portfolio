import type { Metadata } from "next";
import { AboutBlock, SiteFooter } from "../components/blocks";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "About · William Nzive",
  description: "William Nzive — Computer Science and Engineering student at UC Davis who learns whatever a problem requires, from software and ML to electronics and mechanical design.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="/about" />
      <main id="main" className="page">
        <header className="page-head">
          <p className="label">About</p>
          <h1 className="page-title">
            Curious, then <em>rigorous</em>
          </h1>
        </header>
        <section className="section section-tight" aria-label="About William">
          <AboutBlock />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
