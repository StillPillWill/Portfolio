import type { Metadata } from "next";
import { ContactBlock, SiteFooter } from "../components/blocks";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact · William Nzive",
  description: "Get in touch with William Nzive about internships, co-ops, and research collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader current="/contact" />
      <main id="main" className="page page-contact">
        <section className="section-contact" aria-label="Contact">
          <ContactBlock headingLevel={1} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
