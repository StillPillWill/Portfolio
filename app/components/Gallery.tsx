"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "../data/portfolio";

/* eslint-disable @next/next/no-img-element */

/**
 * Gallery with a keyboard-driven lightbox (←/→ to move, Esc to close,
 * focus returned to the opening thumbnail). Uses the native <dialog>.
 */
export function Gallery({ items }: { items: ProjectMedia[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) {
      d.close();
      opener.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, step]);

  const cur = index === null ? null : items[index];

  return (
    <>
      <ul className="gallery">
        {items.map((m, i) => (
          <li key={m.src} className={`gallery-item gallery-${m.ratio}`} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
            <button
              type="button"
              className="gallery-btn"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Open ${m.alt}`}
            >
              {m.kind === "video" ? (
                <video src={m.src} muted loop autoPlay playsInline preload="metadata" aria-hidden="true" />
              ) : (
                <img src={m.src} alt="" loading="lazy" decoding="async" />
              )}
            </button>
            <p className="gallery-cap">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span> {m.caption}
            </p>
          </li>
        ))}
      </ul>
      {/* backdrop click is a mouse convenience; keyboard users close with Esc or the Close button */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <dialog ref={dialog} className="lightbox" onClose={close} onClick={(e) => e.target === e.currentTarget && close()} aria-label="Image viewer">
        {cur ? (
          <figure className="lightbox-fig">
            {cur.kind === "video" ? (
              <video key={cur.src} src={cur.src} controls autoPlay muted loop playsInline aria-label={cur.alt} />
            ) : (
              <img key={cur.src} src={cur.src} alt={cur.alt} />
            )}
            <figcaption>
              <span className="mono">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              {cur.caption}
            </figcaption>
          </figure>
        ) : null}
        <div className="lightbox-ctl">
          <button type="button" onClick={() => step(-1)} aria-label="Previous image">←</button>
          <button type="button" onClick={() => step(1)} aria-label="Next image">→</button>
          <button type="button" onClick={close} aria-label="Close viewer" className="lightbox-close">Close</button>
        </div>
      </dialog>
    </>
  );
}
