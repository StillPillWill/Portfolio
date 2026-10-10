# williamn.site — Audit & Revamp Plan (Oct 10 2026)

## Verdict
The site works (build, lint, 2 SSR tests pass) but reads as a template: a green-on-black "terminal dashboard"
with uppercase mono eyebrows on every block, boxed grids, and the same facts repeated 4–6 times.
It has real bugs on mobile, five duplicated page shells, and a few factual contradictions. Plan: full rebuild of
the presentation layer on the same data, with four project-specific interactive graphics.

---

## Deep-dive: flaws found (measured with qa/audit.mjs + screenshots in qa/before, qa/b)

### Broken / functional
1. **Mobile nav overflows the viewport on every page** — nav links render at x=372–536 px on a 390 px screen; no menu button. Work/Experience/About/Contact/Resume are unreachable on phones.
2. **Mobile project pages overflow** — `.project-note-intent-col` is 320 px wide starting at x=98 → runs off-screen on all 4 project pages.
3. **Hero waveform sweep overflows** horizontally on mobile.
4. **Content hidden until JS reveal fires** — 11 text blocks on `/` and 18 on `/experience` still sit at opacity≈0 after a full scroll pass (reveal thresholds never trip on tall elements). With JS off/slow, content is invisible.
5. **3D viewer hijacks the scroll wheel** (OrbitControls zoom on) — scrolling the page over the model zooms the model instead.
6. **Mobile header**: "William / Nzive" wraps to two lines; "Email" pill crowds the nav.
7. **"View project breakdown" cards on home all link to `/projects`** (generic), not to anything about that item.
8. **`/work` is a silent duplicate of `/projects`** (duplicate content, no canonical).
9. **Five hand-copied headers/footers** (home, projects, project, about, contact, experience) — each with different nav items, labels ("Email" / "Get in touch"), and anchors. Project pages have no nav at all except "← Selected work".
10. **Experience list duplicated verbatim** in `SignalFoundry.tsx` and `app/experience/page.tsx` (~150 lines each).
11. **Profile photo is a placeholder SVG** ("WN" monogram in a frame) presented as a portrait.
12. **`tsc --noEmit` fails** (db/worker Cloudflare types, stray `tmp/` source copy included in compilation).
13. **Fonts**: 3 TTF files preloaded (no woff2), Manrope variable TTF is heavy.
14. **Dead code**: `WorkStack`, `Waveform`(decorative fake data), `useKineticJourney`, `useSmoothProgress`, `chatgpt-auth.ts`, `gsap`, `@react-three/postprocessing`, drizzle/D1 starter — unused. README is still the "vinext-starter" boilerplate; package name `site-creator-vinext-starter`.
15. **globals.css is 3,298 lines** with 6 `!important`s and 23 media queries patching each other.

### Content / accuracy
16. **LinkedIn URL mismatch** — JSON-LD uses `/in/william-nzive/`, page + resume use `/in/william-nzive-622226376/`.
17. **Open Sauce location contradicts resume** — site says San Francisco, resume says San Mateo.
18. **"Summer 2026 internships"** shown as availability — it is October 2026; stale.
19. **Embellishments not in the resume/records**: "hundreds of attendees", "Zero mechanical failures", "Sub-millisecond sync", "welding" listed as something mentored. Removed or softened.
20. **"basically e-waste" repeated 6×**; the same 4.6B / 98 h / 400 h / 90% / $40 line appears 6+ times on the homepage alone.
21. **Decorative "CSI waveform" is random noise** labelled as CSI — misleading on a research portfolio.

### Design ("vibe-coded" tells)
22. Uppercase letter-spaced mono eyebrow above *every* heading and card (~60 on the homepage).
23. Generic neon-green accent + dark grid boxes + "status dot" pills = default AI-dashboard look.
24. Every section is the same "Eyebrow / Big Title. / right-aligned grey note" template, each title ending in a period ("Featured projects." "Technical toolkit." "About me.").
25. Tag-cloud skill chips; bordered card grids for everything; no typographic hierarchy beyond size.
26. Hero 3D model is a tiny arm floating in a large empty grid box.
27. Motion is limited to fade-up reveals and a magnetic button; nothing is *about* the work.

---

## Revamp design

**Direction:** editorial engineering notebook. Warm off-black, paper-white type, one signal-orange accent.
Geist Sans for text, Instrument Serif italic for display accents, Geist Mono only for real data readouts.
No eyebrows-on-everything, no card grids by default; hierarchy from scale, rhythm and whitespace.

**Interactive motion graphics (each tied to the actual project, all real-data-driven or physically honest):**

| Where | Graphic | Interaction |
|---|---|---|
| Hero | **Subcarrier field** — 48 OFDM subcarrier traces across the hero, canvas 2D | Pointer is an acoustic source: traces ripple with distance-based phase shift; click/tap emits a propagating pulse; live HUD readout of subcarrier # and Δφ under the cursor |
| CSI | **Live spectrogram waterfall** (time × subcarrier) | Pointer over it injects "speech" energy bands; counters count up on view |
| Vulcan | **Real GLB model** (existing assets), fixed | Drag to rotate, no scroll-hijack, joint labels, auto-rotate pauses on interaction |
| Ender3-2 | **12 × 18 bilinear bed mesh** in isometric 3D (the actual probe grid size) | Drag to tilt; nozzle probe follows cursor reading interpolated Z; animated probing sweep on view |
| Team 3598 | **4,452 particles** (one per student reached) that assemble into "3598" | Cursor scatters them; they spring back |

Plus: scroll-progress timeline for experience, smooth-height accordions for the project index,
keyboard lightbox for galleries, count-up stats, copy-email button, animated mobile menu.
All graphics: pause off-screen and in background tabs, respect `prefers-reduced-motion` (static frame),
DPR-aware, no layout thrash.

**Structure**
- Shared `SiteHeader` (sticky, condenses on scroll, active-section, mobile menu) and `SiteFooter` used by every route.
- `/` Home: Hero → Selected work (4 chapters with specimen graphics) → Index of other work (accordions with dossiers) → Experience timeline → About/skills → Contact.
- `/projects`: full index. `/projects/{csi,vulcan,ender3-2,team-3598}`: one `ProjectPage` template (hero specimen, stats band, sticky notes, lightbox gallery, prev/next).
- `/experience`, `/about`, `/contact`: lean pages built from the same section components (no duplication). `/work` → canonical to `/projects`.
- Content visible without JS (reveal only enhances when `html.js` is set).
- CSS rewritten from scratch (~1k lines target), woff2 fonts.

**Not touched without permission:** no files deleted. Dead files and junk folders (`tmp/`, `_docx-qa*`, `_media-review*`, `_resume-review`, `noah-studio-site-*.tar.gz`, unused components) are listed for you to approve.

---

## Validation gates (must all pass before reporting)
1. `npm run lint` clean; `tsc --noEmit` clean for app code.
2. `npm test` — SSR tests updated + extended (every route 200, nav present on every page, no duplicate IDs, LinkedIn consistent, 404 returns 404).
3. `qa/audit.mjs` at 1440×900 and 390×844 on all 11 routes: 0 console errors, 0 failed requests, 0 horizontal overflow, 0 broken images, 0 dead hash links, 0 hidden-text blocks.
4. Interaction script: each graphic renders non-blank pixels, responds to pointer (pixel diff before/after pointer move > threshold), mobile menu opens/closes, accordion expands, lightbox opens/closes with Esc, copy-email works.
5. Reduced-motion run: graphics draw a static frame, no rAF loop running.
6. Visual check of desktop + mobile screenshots of every page.
