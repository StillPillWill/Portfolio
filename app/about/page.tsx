import type { Metadata } from "next";
import { AboutBlock, SiteFooter } from "../components/blocks";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "About · William Nzive",
  description: "William Nzive, a Computer Science and Engineering student at UC Davis working across software, machine learning, electronics and mechanical design.",
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
          <h1 className="page-title">About</h1>
        </header>
        <section className="section section-tight" aria-label="About William">
          <AboutBlock />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
