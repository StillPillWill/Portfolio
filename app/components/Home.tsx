import { categoryCounts, site } from "../../content";
import { Arrow, ContactBlock, AboutBlock, ExperienceTimeline, SectionHead, SiteFooter } from "./blocks";
import { buildCards } from "./cards";
import { ProjectExplorer } from "./ProjectExplorer";
import { SiteHeader } from "./SiteHeader";

export function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="intro" aria-labelledby="hero-title">
          <h1 id="hero-title" className="intro-name">
            William Nzive
          </h1>
          <p className="intro-lede">
            Computer science and engineering student at UC Davis. I work across software, machine learning, electronics
            and mechanical design, and I measure the result instead of asserting it. Speaker recognition over Wi-Fi on
            $40 of parts, a six-axis robot arm, and a printer rebuilt from scrap at three times the build volume are
            below.
          </p>
          <p className="intro-links">
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <a className="link" href="/resume.pdf" target="_blank" rel="noreferrer">
              Résumé <Arrow />
            </a>
            <a className="link" href={site.github} target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </p>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <SectionHead
            id="work-title"
            index="01"
            title="Work"
          />
          <ProjectExplorer cards={buildCards()} categories={categoryCounts()} sticky={false} />
        </section>

        <section className="section" id="experience" aria-labelledby="exp-title">
          <SectionHead
            id="exp-title"
            index="02"
            title="Experience"
            aside={
              <a className="link" href="/resume.pdf" target="_blank" rel="noreferrer">
                Full résumé (PDF) <Arrow />
              </a>
            }
          />
          <ExperienceTimeline />
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <SectionHead id="about-title" index="03" title={<>About</>} />
          <AboutBlock />
        </section>

        <section className="section section-contact" id="contact" aria-labelledby="contact-title">
          <ContactBlock />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
