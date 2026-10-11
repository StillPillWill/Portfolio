import { allProjects } from "../../content";

/* eslint-disable @next/next/no-img-element */

type Tile = { src: string; alt: string; ratio: string; href?: string; label: string };

const IMG = /\.(webp|jpe?g|png|avif)$/i;
const RATIO: Record<string, string> = { wide: "3 / 2", portrait: "3 / 4", square: "1 / 1" };
const COLS = 6;
const PER_COL = 7; // enough tiles that one loop is taller than the screen

/**
 * Drifting photo collage built from every project's media — add photos to a
 * project and they appear here. Pure CSS motion (no JS loop); CollageFX adds
 * pointer parallax and pauses it when the hero is off-screen.
 */
export function HeroCollage() {
  // round-robin across projects so neighbouring tiles come from different projects
  const perProject = allProjects.map((p) =>
    p.media
      .filter((m) => m.kind !== "video" && IMG.test(m.src))
      .map<Tile>((m) => ({ src: m.src, alt: m.alt, ratio: RATIO[m.ratio] ?? "3 / 2", href: p.href, label: p.name })),
  );
  const pool: Tile[] = [];
  for (let i = 0; perProject.some((l) => i < l.length); i++) for (const l of perProject) if (i < l.length) pool.push(l[i]);
  if (pool.length === 0) return null;

  const cols = Array.from({ length: COLS }, (_, c) =>
    Array.from({ length: PER_COL }, (_, k) => pool[(c * 5 + k * 7) % pool.length]),
  );

  return (
    <div className="collage" aria-hidden="true">
      {cols.map((tiles, c) => (
        <div key={c} className={`collage-col collage-col-${c + 1}`}>
          <div className="collage-track" style={{ animationDuration: `${64 + c * 11}s` }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="collage-copy">
                {tiles.map((t, i) => (
                  <a
                    key={i}
                    className="collage-tile"
                    href={t.href}
                    tabIndex={-1}
                    style={{ aspectRatio: t.ratio }}
                    data-label={t.label}
                  >
                    <img src={t.src} alt="" loading={copy === 0 && i < 2 ? "eager" : "lazy"} decoding="async" draggable={false} />
                    <span className="collage-cap">{t.label}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

