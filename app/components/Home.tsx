import { contact, featured, projects } from "../data/portfolio";
import { Arrow, ContactBlock, AboutBlock, ExperienceTimeline, ProjectLink, SectionHead, SiteFooter, Specimen, Stats, WorkIndex } from "./blocks";
import { SubcarrierField } from "./motion/SubcarrierField";
import { SiteHeader } from "./SiteHeader";

export function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <SubcarrierField className="hero-field" />
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
              <a className="link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </div>
          <p className="hero-hint mono" aria-hidden="true">
            move or tap — you&apos;re the sound source
          </p>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <SectionHead
            id="work-title"
            index="01"
            title={
              <>
                Selected <em>work</em>
              </>
            }
            aside={<p>Four projects that show how I work. Each has something you can poke at.</p>}
          />
          <div className="chapters">
            {featured.map((f, i) => (
              <article key={f.key} className={`chapter chapter-${f.key}${i % 2 ? " chapter-flip" : ""}`} aria-labelledby={`ch-${f.key}`}>
                <div className="chapter-copy" data-reveal>
                  <p className="label">
                    <span className="mono">{projects[f.key].number}</span> {f.kicker}
                  </p>
                  <h3 id={`ch-${f.key}`}>{f.title}</h3>
                  <p className="chapter-line">{f.line}</p>
                  <Stats projectKey={f.key} compact />
                  <ProjectLink k={f.key} />
                </div>
                <div className="chapter-visual" data-reveal>
                  <Specimen projectKey={f.key} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="more" aria-labelledby="more-title">
          <SectionHead
            id="more-title"
            index="02"
            title={
              <>
                Also <em>built</em>
              </>
            }
            aside={<p>Smaller projects and ongoing research. Open any row for the details.</p>}
          />
          <WorkIndex />
        </section>

        <section className="section" id="experience" aria-labelledby="exp-title">
          <SectionHead
            id="exp-title"
            index="03"
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
          <SectionHead id="about-title" index="04" title={<>About</>} />
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
