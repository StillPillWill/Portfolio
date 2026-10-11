/* eslint-disable @next/next/no-img-element */

/** Lightweight, serialisable card data (built on the server from content/). */
export type Card = {
  slug: string;
  name: string;
  summary: string;
  proof?: string;
  categories: string[]; // ids
  skills: string[];
  start: number;
  endYear: number; // 9999 = ongoing
  years: string;
  status: string;
  featured: boolean;
  href?: string;
  thumb?: string;
  flagship: boolean;
};

/** One project card. Used by the homepage and the /projects index so they always match. */
export function ProjectCard({ c, view = "grid", catLabel }: { c: Card; view?: "grid" | "list"; catLabel: (id: string) => string }) {
  const inner = (
    <>
      {c.thumb && view === "grid" ? (
        <span className="card-thumb">
          <img src={c.thumb} alt="" loading="lazy" decoding="async" />
        </span>
      ) : null}
      <span className="card-body">
        <span className="card-meta label">
          <span>{c.categories.map(catLabel).join(" · ")}</span>
          <span className="mono">{c.years}</span>
        </span>
        <span className="card-name">{c.name}</span>
        <span className="card-sum">{c.proof && !c.href ? c.proof : c.summary}</span>
        {c.href ? (
          <span className="card-go link">
            {c.flagship ? "Case study" : "Open"} <span aria-hidden="true">→</span>
          </span>
        ) : (
          <span className="card-tag mono">note</span>
        )}
      </span>
    </>
  );
  return (
    <li className={`card${c.flagship ? " card-flagship" : ""}${c.href ? "" : " card-note"}`}>
      {c.href ? (
        <a href={c.href} className="card-link">
          {inner}
        </a>
      ) : (
        <div className="card-link">{inner}</div>
      )}
    </li>
  );
}
