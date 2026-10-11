# Adding content

Everything on the site comes from `content/`. You never edit a route, a list, or the sitemap.

## Add a project

```
npm run new:project -- my-project flagship   # or: standard | note
```

This creates `content/projects/my-project.ts` (with a commented template) and `public/projects/my-project/`.
Fill it in, drop photos / the GLB into that folder, then:

```
npm run content:check      # schema + files-on-disk validation, with clear error messages
npm run dev
```

That is the whole job. The project then appears on `/projects` (filters, search, sort), in prev/next, in
"related work", in the sitemap, and — if you set `featured: <rank>` — on the homepage.

### Tiers

| tier       | gets                                              | use for                                  |
| ---------- | ------------------------------------------------- | ---------------------------------------- |
| `flagship` | full case study: graphic, stats, notes, gallery   | the few projects you want to lead with   |
| `standard` | its own page; any section without data is omitted | most projects                            |
| `note`     | a row on the index, no page                       | hackathons, exhibitions, short items     |

### Rules the checker enforces

- unique lowercase-hyphen slug that matches the filename
- known categories; `summary` ≤ 160 characters
- flagship needs deck + stats + notes + (specimen or media)
- every media / model path exists under `public/projects/<slug>/`
- featured ranks are unique; links are http(s) URLs

It also warns about files in `public/projects/` that no project references.

## Add a category

Add one line to `content/taxonomy.ts`. It becomes a valid value for `categories` and a filter chip.

## Add an interactive graphic

1. Build the component in `app/components/motion/` (use `useCanvas`: DPR, pause off-screen, reduced motion).
2. Add its id to `SpecimenId` in `content/types.ts`.
3. Add one entry in `app/components/specimens.tsx`.
4. Set `specimen: "your-id"` in a project.

## Add an experience entry

Append to `content/experience.ts`. Set `project: "<slug>"` to link it to a project page.

## Folder map

```
content/projects/<slug>.ts   one file per project (the only thing you write)
content/experience.ts        roles and positions
content/site.ts              name, contact, education, skills
content/taxonomy.ts          categories
content/index.ts             registry: collects, validates, sorts (do not edit)
public/projects/<slug>/      that project's media and 3D model
legacy/                      old code and data, kept for reference (not built)
```
