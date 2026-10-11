"use client";

import { useRef } from "react";

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
  /** the cover is a chart (white background), not a photo */
  thumbIsFigure?: boolean;
  preview?: string;
  flagship: boolean;
};

/**
 * One project tile, image first. Used by the homepage and the /projects index so
 * they always match. Projects with no photo get a typographic plate instead of a
 * fake image. If a project has a `preview` clip it plays muted on hover/focus.
 */
export function ProjectCard({ c, view = "wall", labels, span }: { c: Card; view?: "wall" | "list"; labels: Record<string, string>; span?: number }) {
  const vid = useRef<HTMLVideoElement>(null);
  const play = () => {
    const v = vid.current;
    if (!v || !c.preview) return;
    if (!v.getAttribute("src")) v.setAttribute("src", c.preview);
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = vid.current;
    if (!v) return;
    v.pause();
  };
  const cats = c.categories.map((id) => labels[id] ?? id);

  const media =
    view === "wall" ? (
      <span className={`tile-media${c.thumb ? "" : " tile-plate"}${c.thumbIsFigure ? " tile-fig" : ""}`}>
        {c.thumb ? (
          <img src={c.thumb} alt="" loading="lazy" decoding="async" />
        ) : (
          <span className="plate" aria-hidden="true">
            <span className="plate-cat">{cats[0]}</span>
            <span className="plate-stack mono">{c.skills.slice(0, 5).join("  ·  ")}</span>
          </span>
        )}
        {c.preview ? <video ref={vid} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} /> : null}
      </span>
    ) : null;

  const body = (
    <span className="tile-body">
      <span className="tile-meta label">
        <span>{cats.join(" · ")}</span>
        <span className="mono">{c.years}</span>
      </span>
      <span className="tile-name">{c.name}</span>
      <span className="tile-sum">{c.proof && !c.href ? c.proof : c.summary}</span>
      {c.href ? (
        <span className="tile-go">
          {c.flagship ? "Case study" : "Open"} <span aria-hidden="true">→</span>
        </span>
      ) : (
        <span className="tile-tag mono">note</span>
      )}
    </span>
  );

  const cls = `tile tile-${view}${c.flagship ? " tile-flagship" : ""}${c.href ? "" : " tile-note"}`;
  const inner = (
    <>
      {media}
      {body}
    </>
  );
  return (
    <li className={cls} style={span ? { gridColumn: `span ${span}` } : undefined} onPointerEnter={play} onPointerLeave={stop} onFocus={play} onBlur={stop}>
      {c.href ? (
        <a href={c.href} className="tile-link">
          {inner}
        </a>
      ) : (
        <div className="tile-link">{inner}</div>
      )}
    </li>
  );
}
