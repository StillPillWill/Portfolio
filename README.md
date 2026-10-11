# williamn.site

Portfolio of William Nzive: an engineering notebook with a wall of projects.
Built on [vinext](https://github.com/cloudflare/vinext) (Next.js API on Vite) and
deployed to Cloudflare Workers.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build
npm test           # content check, build, rendered-HTML tests
```

Requires Node.js 22.13 or newer.

## Add a project

One file per project. See [CONTENT.md](CONTENT.md).

```bash
npm run new:project -- my-project flagship   # or: standard | note
npm run content:check
```

The project page, index entry, homepage tile, sitemap and prev/next links are
all generated from that file.

## Layout

- `content/` projects, experience and site copy (the only place text lives)
- `app/` routes and components
- `public/projects/<slug>/` photos, video and 3D models per project
- `tools/` content validator and project scaffolder
- `qa/` browser audits (layout, interaction, performance)
- `tests/` server-rendered HTML tests
- `legacy/` retired code, kept for reference
