import { allProjects, featuredProjects, site, yearLabel, CATEGORY_LABEL } from "../../content";
import { Arrow, ContactBlock, AboutBlock, ExperienceTimeline, ProjectLink, SectionHead, SiteFooter, Stats } from "./blocks";
import { CollageFX } from "./CollageFX";
import { HeroCollage } from "./HeroCollage";
import { ProjectCard } from "./ProjectCard";
import { SiteHeader } from "./SiteHeader";
import { Specimen } from "./specimens";

const MORE_LIMIT = 8;

export function Home() {
  const more = allProjects.filter((p) => p.featured === undefined);
  const shown = more.slice(0, MORE_LIMIT);
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
                Selected <em>work</em>
              </>
            }
            aside={<p>{`${featuredProjects.length} projects that show how I work. Each has something you can poke at.`}</p>}
          />
          <div className="chapters">
            {featuredProjects.map((p, i) => (
              <article key={p.slug} className={`chapter chapter-${p.slug}${i % 2 ? " chapter-flip" : ""}`} aria-labelledby={`ch-${p.slug}`}>
                <div className="chapter-copy" data-reveal>
                  <p className="label">
                    <span className="mono">{String(p.featured).padStart(2, "0")}</span> {p.kicker ?? p.categories.join(" · ")}
                  </p>
                  <h3 id={`ch-${p.slug}`}>{p.headline ?? p.name}</h3>
                  <p className="chapter-line">{p.summary}</p>
                  <Stats project={p} compact />
                  <ProjectLink project={p} />
                </div>
                <div className="chapter-visual" data-reveal>
                  <Specimen project={p} />
                </div>
              </article>
            ))}
          </div>
        </section>

        {shown.length ? (
          <section className="section" id="more" aria-labelledby="more-title">
            <SectionHead
              id="more-title"
              index="02"
              title={
                <>
                  Also <em>built</em>
                </>
              }
              aside={
                <a className="link" href="/projects">
                  {`All ${allProjects.length} projects`} <Arrow dir="e" />
                </a>
              }
            />
            <ul className="cards cards-grid">
              {shown.map((p) => (
                <ProjectCard
                  key={p.slug}
                  catLabel={(id) => CATEGORY_LABEL[id as keyof typeof CATEGORY_LABEL] ?? id}
                  c={{
                    slug: p.slug,
                    name: p.name,
                    summary: p.summary,
                    proof: p.proof,
                    categories: p.categories,
                    skills: p.skills ?? [],
                    start: p.start,
                    endYear: p.end === "present" ? 9999 : (p.end ?? p.start),
                    years: yearLabel(p),
                    status: p.status,
                    featured: false,
                    href: p.href,
                    thumb: p.thumb,
                    flagship: p.tier === "flagship",
                  }}
                />
              ))}
            </ul>
            {more.length > shown.length ? (
              <p className="more-foot">
                <a className="link" href="/projects">
                  {`+ ${more.length - shown.length} more on the projects page`} <Arrow dir="e" />
                </a>
              </p>
            ) : null}
          </section>
        ) : null}

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
