# Projects architecture plan — "add a project by adding one file"

## Why it's messy now (measured)
Adding one project today means touching **8 places**:
1. `data/portfolio.ts` — `ProjectKey` union, `projects` record, `projectStats`, `featured`, dead `chapters` array
2. `data/cv.ts` — a second, separate description of the same project (`experience` / `additionalExperience`)
3. `app/projects/<slug>/page.tsx` — a copy-pasted route with hand-written metadata
4. `ProjectPage.tsx` — hard-coded `ORDER` array for prev/next
5. `blocks.tsx` — `Specimen` switch hard-coded per slug
6. `app/sitemap.ts` — hand-listed URLs
7. `public/portfolio/media/` — inconsistent layout (`team3598.webp` beside `team3598/`, `vulcan-*.webp` loose at root)
8. `Home.tsx` / `/projects` — featured list and index are hand-maintained

Other problems that get worse with scale:
- Two data shapes for projects (`Project` with beats vs `CvRecord` with dossier); small projects have no page at all, only an accordion.
- `/projects` is a fixed 4-tile list + accordion; no filtering, sorting or search; it will not survive 20+ entries.
- No validation: a typo in a media path or a duplicate slug only shows up in the browser.
- `portfolio.ts` is already 480 lines for 4 projects (~100/project).

## Target
**One file per project. One registry. Everything else derived.**

```
content/
  projects/
    csi.ts            ← defineProject({...})  the ONLY file to add for a new project
    vulcan.ts
    ender3-2.ts
    team-3598.ts
    parkinsons-datscan.ts   (current "additional" items become real projects)
    ...
  experience.ts       ← internship / captaincy / regatta: roles, link to project slugs
  site.ts             ← name, contact, education, skills
  taxonomy.ts         ← categories (Research, Robotics, Fabrication, ML, Systems, Leadership)
  index.ts            ← registry: auto-collects content/projects/*.ts, sorts, validates
public/projects/<slug>/…   ← all media + models for a project live with its slug
```

### One schema, three tiers
```ts
defineProject({
  slug, name, year, status,            // status: "active" | "complete" | "paused" | "archived"
  tier: "flagship" | "standard" | "note",
  featured?: boolean,                  // appears on homepage
  categories: ["research", "ml"],      // from taxonomy (typo = type error)
  skills: ["ESP32", "PyTorch"],
  summary,                             // one line, used on cards + metadata
  deck?, proof?,                       // longer intro / headline result
  links?: { repo?, demo?, paper?, writeup? },
  stats?: [...],                       // count-up numbers
  specimen?: "spectrogram" | "bedmesh" | "particles" | "model" | "image",
  model?, media?: [...],               // paths relative to public/projects/<slug>/
  notes?: [...beats],                  // case-study sections
  dossier?: {...},                     // architecture / decisions / tools (current accordion data)
})
```
- **flagship**: full page with specimen graphic, stats, notes, gallery (today's four).
- **standard**: same page template; sections render only if data exists (no empty headers). Replaces the accordion-only items.
- **note**: listed on the index with an expandable row, no own page (quick hackathon / exhibition entries).

### Derived automatically from the registry
- Routes: one `app/projects/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata` (replaces 4 copied route files)
- Prev/next, homepage featured list, `/projects` index, `/work`, sitemap, JSON-LD, OG titles
- Specimen: a registry `specimens.ts` maps id → component. New graphic = write component + one line.
- Related projects: shared categories/skills, shown at the foot of each page.

### `/projects` index that scales
Server-rendered full list (works without JS, crawlable) + client enhancement:
- category filter chips with counts, skill search box, sort (newest / featured / status)
- grouped by year when unfiltered; layout switch grid ⇄ list
- state kept in the URL (`/projects?cat=ml&q=esp32`) so filtered views are linkable
- Homepage shows only `featured` (max 4–6) + "All N projects →"

### Guardrails
- `npm test` gets a **content validator**: unique slugs, slug = filename, required fields per tier, every media/model path exists on disk, links are valid URLs, category ids exist, stats numeric, summary length ≤ 160, no orphan folders in `public/projects/`.
- `npm run new:project <slug>` scaffolds the file + media folder with a commented template.
- `CONTENT.md` — 1-page "how to add a project / graphic / category".

## Migration (nothing deleted)
1. Create `content/` and schema; port the 4 flagships field-for-field (diff the rendered HTML before/after).
2. Promote the 6 `additionalExperience` items to `standard`/`note` projects.
3. Split `cv.ts`: experience stays (roles), project descriptions move to project files; experience links by slug.
4. `git mv` media into `public/projects/<slug>/` and update paths (reversible, tracked by git).
5. Replace the 4 route files with `[slug]`; old URLs unchanged (`/projects/csi` etc.).
6. Move old data files to `legacy/` (kept, not deleted).

## Validation gates
1. `tsc` + lint clean; rendered HTML of the existing 4 project pages and home **identical in content** to current (text diff of before/after).
2. Content validator passes; deliberately break 5 things (dup slug, missing image, bad category, missing required field, empty summary) and confirm each is caught with a clear message.
3. **Scale test:** generate 40 synthetic projects in a temp dir, build, check: index renders, filters work, pager wraps, sitemap lists all, build time and index page weight reported. Remove synthetic data.
4. Existing audit (all routes × desktop/mobile) and 31-check interaction suite still pass; new checks for filter chips, search, URL state, sort, grid/list switch, `[slug]` 404 for unknown slug.
5. Screenshot review of `/projects` with 4, 12 and 40 projects, desktop + mobile.

## Decisions I'm defaulting (say if wrong)
- Categories: Research · ML · Systems · Robotics · Fabrication · Leadership.
- `Experience` (internship, captaincy, regatta) stays a separate timeline; it links to projects, it isn't one.
- Media moves to `public/projects/<slug>/`; old `public/portfolio/` kept until you approve deleting it.
