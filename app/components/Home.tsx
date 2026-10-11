import { allProjects, categoryCounts, site } from "../../content";
import { Arrow, ContactBlock, AboutBlock, ExperienceTimeline, SectionHead, SiteFooter } from "./blocks";
import { buildCards } from "./cards";
import { CollageFX } from "./CollageFX";
import { HeroCollage } from "./HeroCollage";
import { ProjectExplorer } from "./ProjectExplorer";
import { SiteHeader } from "./SiteHeader";

export function Home() {
  return (
    <>
      <CollageFX />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <HeroCollage />
          <div className="hero-inner">
            <p className="hero-kicker label">
              <span className="dot" aria-hidden="true" /> Computer Science &amp; Engineering, UC Davis
            </p>
            <h1 id="hero-title" className="hero-title">
              <span className="line">
                <span>William Nzive</span>
              </span>
              <span className="line">
                <span>
                  learns what a <em>hard problem</em>
                </span>
              </span>
              <span className="line">
                <span>
                  needs, then <em>proves</em> it.
                </span>
              </span>
            </h1>
            <p className="hero-lede">
              I pick up whatever the problem demands — code, machine learning, electronics, CAD, a machine shop — and
              measure the result instead of asserting it. The projects below are evidence of that, not the boundary of it:
              speaker recognition over Wi‑Fi on $40 of parts, a six-axis arm, a printer rebuilt from scrap at over three
              times the volume.
            </p>
            <div className="hero-cta">
              <a className="btn" href="#work">
                See the work <Arrow dir="e" />
              </a>
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
          <p className="hero-hint mono" aria-hidden="true">
            hover a photo to hold it · click to open the project
          </p>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <SectionHead
            id="work-title"
            index="01"
            title={
              <>
                All <em>work</em>
              </>
            }
            aside={<p>{`${allProjects.length} projects, newest first. Filter by discipline or search by skill. Hover a tile for a preview.`}</p>}
          />
          <ProjectExplorer cards={buildCards()} categories={categoryCounts()} sticky={false} />
        </section>

        <section className="section" id="experience" aria-labelledby="exp-title">
          <SectionHead
            id="exp-title"
            index="02"
            title={
              <>
                <em>Experience</em>
              </>
            }
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
