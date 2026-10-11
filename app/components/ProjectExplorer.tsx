"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ProjectCard, type Card } from "./ProjectCard";

export type { Card };

/**
 * Pack tiles into rows of `cols` columns, in order (never reordered). `want(c)` is a
 * tile's preferred width; a row that can't take the next tile is closed and its tiles
 * are widened evenly to fill it, so no row ever has a hole.
 */
function packSpans(cards: Card[], cols: number, want: (c: Card) => number): number[] {
  const spans: number[] = new Array(cards.length).fill(0);
  let start = 0;
  let used = 0;
  const close = (end: number) => {
    const n = end - start;
    if (n <= 0) return;
    for (let i = start; i < end; i++) spans[i] = want(cards[i]);
    let rest = cols - used;
    for (let k = 0; rest > 0; k++) {
      const grow = Math.min(rest, 2);
      spans[start + (k % n)] += grow;
      rest -= grow;
    }
  };
  for (let i = 0; i < cards.length; i++) {
    const w = want(cards[i]);
    if (used + w > cols) {
      close(i);
      start = i;
      used = 0;
    }
    used += w;
  }
  close(cards.length);
  return spans;
}

/** Wall column count follows the viewport: 12 (desktop), 12 with wider tiles (tablet), 12 single-tile rows (phone). */
function useWallMode(): "wide" | "mid" | "narrow" {
  const [mode, setMode] = useState<"wide" | "mid" | "narrow">("wide");
  useEffect(() => {
    const mid = window.matchMedia("(max-width: 1000px)");
    const narrow = window.matchMedia("(max-width: 640px)");
    const upd = () => setMode(narrow.matches ? "narrow" : mid.matches ? "mid" : "wide");
    upd();
    mid.addEventListener("change", upd);
    narrow.addEventListener("change", upd);
    return () => {
      mid.removeEventListener("change", upd);
      narrow.removeEventListener("change", upd);
    };
  }, []);
  return mode;
}

type Cat = { id: string; label: string; count: number };
type Sort = "recent" | "oldest" | "name";
type View = "wall" | "list";

const SORTS: Array<{ id: Sort; label: string }> = [
  { id: "recent", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "name", label: "A–Z" },
];

/**
 * The projects index. Every project is in the server-rendered HTML (works with
 * JavaScript off and for crawlers); on the client this filters, searches, sorts,
 * and keeps its state in the URL so any view is linkable.
 */
export function ProjectExplorer({ cards, categories, sticky = true }: { cards: Card[]; categories: Cat[]; sticky?: boolean }) {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [view, setView] = useState<View>("wall");
  const ready = useRef(false);

  // read initial state from the URL once, after hydration (keeps SSR markup stable)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect */
    const c = sp.get("cat");
    if (c && categories.some((x) => x.id === c)) setCat(c);
    setQ(sp.get("q") ?? "");
    const s = sp.get("sort") as Sort | null;
    if (s && SORTS.some((x) => x.id === s)) setSort(s);
    if (sp.get("view") === "list") setView("list");
    /* eslint-enable react-hooks/set-state-in-effect */
    ready.current = true;
  }, [categories]);

  // write state back to the URL
  useEffect(() => {
    if (!ready.current) return;
    const sp = new URLSearchParams();
    if (cat !== "all") sp.set("cat", cat);
    if (q.trim()) sp.set("q", q.trim());
    if (sort !== "recent") sp.set("sort", sort);
    if (view !== "wall") sp.set("view", view);
    const qs = sp.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
  }, [cat, q, sort, view]);

  const shown = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = cards.filter((c) => {
      if (cat !== "all" && !c.categories.includes(cat)) return false;
      if (!terms.length) return true;
      const hay = `${c.name} ${c.summary} ${c.skills.join(" ")} ${c.categories.join(" ")}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
    const cmp: Record<Sort, (a: Card, b: Card) => number> = {
      recent: (a, b) => b.endYear - a.endYear || b.start - a.start || a.name.localeCompare(b.name),
      oldest: (a, b) => a.start - b.start || a.endYear - b.endYear || a.name.localeCompare(b.name),
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...list].sort(cmp[sort]);
  }, [cards, cat, q, sort]);

  const mode = useWallMode();
  const spans = useMemo(() => {
    if (mode === "narrow") return shown.map(() => 12);
    if (mode === "mid") return packSpans(shown, 12, (c) => (c.flagship ? 12 : 6));
    return packSpans(shown, 12, (c) => (c.flagship ? 8 : 4));
  }, [shown, mode]);
  const filtered = cat !== "all" || q.trim() !== "";
  const labels = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.label])) as Record<string, string>, [categories]);

  // group by year only when the order is chronological
  const groups = useMemo(() => {
    if (sort === "name" || view === "wall") return [{ key: "", items: shown }];
    const out: Array<{ key: string; items: Card[] }> = [];
    for (const c of shown) {
      const key = c.endYear === 9999 ? "Ongoing" : String(sort === "oldest" ? c.start : c.endYear);
      const last = out[out.length - 1];
      if (last && last.key === key) last.items.push(c);
      else out.push({ key, items: [c] });
    }
    return out;
  }, [shown, sort, view]);

  return (
    <div className={`explorer${sticky ? "" : " explorer-flat"}`}>
      <div className="explorer-bar" role="search">
        <div className="chips" role="group" aria-label="Filter by category">
          <button type="button" className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            All <span className="chip-n">{cards.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label} <span className="chip-n">{c.count}</span>
            </button>
          ))}
        </div>
        <div className="explorer-tools">
          <label className="search">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects, skills…"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label className="select">
            <span className="sr-only">Sort projects</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div className="seg" role="group" aria-label="Layout">
            <button type="button" aria-pressed={view === "wall"} onClick={() => setView("wall")}>
              Wall
            </button>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
              List
            </button>
          </div>
        </div>
      </div>

      <p className="explorer-count mono" role="status" aria-live="polite">
        {filtered ? `${shown.length} of ${cards.length} projects` : `${cards.length} projects`}
        {filtered ? (
          <button
            type="button"
            className="link"
            onClick={() => {
              setCat("all");
              setQ("");
            }}
          >
            Clear filters
          </button>
        ) : null}
      </p>

      {shown.length === 0 ? (
        <p className="explorer-empty">
          Nothing matches that. Try a broader search or{" "}
          <button
            type="button"
            className="link"
            onClick={() => {
              setCat("all");
              setQ("");
            }}
          >
            clear the filters
          </button>
          .
        </p>
      ) : (
        groups.map((g) => (
          <section key={g.key || "all"} className="year-group" aria-label={g.key || "Projects"}>
            {g.key ? <h2 className="year-h mono">{g.key}</h2> : null}
            <ul className={`tiles tiles-${view}`}>
              {g.items.map((c, i) => (
                <ProjectCard key={c.slug} c={c} view={view} labels={labels} span={view === "wall" ? spans[i] : undefined} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
