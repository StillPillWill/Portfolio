import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

// Routes are derived from content/projects/ so a new project is tested with no test edits.
import fs from "node:fs";
const pagedSlugs = fs
  .readdirSync(new URL("../content/projects/", import.meta.url))
  .filter((f) => f.endsWith(".ts"))
  .map((f) => f.replace(/\.ts$/, ""))
  .filter((slug) => !/tier: "note"/.test(fs.readFileSync(new URL(`../content/projects/${slug}.ts`, import.meta.url), "utf8")));
const ROUTES = ["/", "/projects", ...pagedSlugs.map((s) => `/projects/${s}`), "/experience", "/about", "/contact", "/work"];

test("every route renders with shared header, one h1, footer, and no duplicate ids", async () => {
  for (const route of ROUTES) {
    const res = await render(route);
    assert.equal(res.status, 200, route);
    const html = await res.text();
    assert.match(html, /<title>[^<]*William Nzive/i, `${route} title`);
    assert.match(html, /aria-label="Primary"/, `${route} nav`);
    assert.match(html, /aria-controls="site-nav"/, `${route} menu button`);
    assert.match(html, /href="\/resume\.pdf"/, `${route} resume`);
    assert.match(html, /class="footer"/, `${route} footer`);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${route} h1 count`);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    assert.deepEqual(dup, [], `${route} duplicate ids`);
    assert.doesNotMatch(html, /e-waste/i, `${route} copy`);
  }
});

test("homepage content is server-rendered (visible without JS)", async () => {
  const html = await (await render("/")).text();
  for (const needle of [
    "Selected",
    "Hearing sound through Wi",
    "Vulcan, a six-axis arm",
    "Captain, FRC Team 3598",
    "UCSC Science Internship Program",
    "DaTscan",
    "williamnzive2007@gmail.com",
    "Skip to content",
  ]) assert.ok(html.includes(needle), `missing: ${needle}`);
  assert.match(html, /class="no-js"/);
  assert.doesNotMatch(html, /Your site is taking shape/);
});

test("project pages carry stats, notes, and prev/next", async () => {
  for (const [path, name] of [["/projects/csi", "CSI Research"], ["/projects/vulcan", "Vulcan"], ["/projects/ender3-2", "Ender3-2"], ["/projects/team-3598", "Team 3598"]]) {
    const html = await (await render(path)).text();
    assert.ok(html.includes(name), path);
    assert.match(html, /aria-label="More projects"/, `${path} pager`);
    assert.match(html, /class="note"/, `${path} notes`);
    assert.match(html, /<dl class="stats"/, `${path} stats`);
  }
});

test("facts agree with the résumé, LinkedIn is consistent", async () => {
  const csi = await (await render("/projects/csi")).text();
  assert.match(csi, /10,839/);
  const ender = await (await render("/projects/ender3-2")).text();
  assert.match(ender, /San Mateo/);
  assert.doesNotMatch(ender, /San Francisco/);
  const home = await (await render("/")).text();
  const links = new Set([...home.matchAll(/linkedin\.com\/in\/[^"\\]+/g)].map((m) => m[0].replace(/\/$/, "")));
  assert.equal(links.size, 1, `linkedin variants: ${[...links]}`);
});

test("unknown path returns 404 with the site shell", async () => {
  const res = await render("/does-not-exist");
  assert.equal(res.status, 404);
  assert.match(await res.text(), /Primary/);
});

test("every project in content/ is in the sitemap, the index, and has its own page", async () => {
  const sm = await (await render("/sitemap.xml")).text();
  const index = await (await render("/projects")).text();
  for (const slug of pagedSlugs) {
    assert.match(sm, new RegExp(`/projects/${slug}<`), `${slug} in sitemap`);
    assert.match(index, new RegExp(`href="/projects/${slug}"`), `${slug} on /projects`);
  }
});

test("project pages link prev/next to real project pages and show related work", async () => {
  for (const slug of pagedSlugs) {
    const html = await (await render(`/projects/${slug}`)).text();
    const hrefs = [...html.matchAll(/class="pager-(?:prev|next)"[^>]*href="([^"]+)"|href="([^"]+)"[^>]*class="pager-(?:prev|next)"/g)].map((m) => m[1] ?? m[2]);
    assert.equal(hrefs.length, 2, `${slug} pager`);
    for (const h of hrefs) assert.ok(pagedSlugs.includes(h.replace("/projects/", "")), `${slug} pager -> ${h}`);
  }
});

test("projects index server-renders every project and the category filters (no JS needed)", async () => {
  const html = await (await render("/projects")).text();
  assert.match(html, /aria-label="Filter by category"/);
  assert.match(html, /type="search"/);
  assert.ok((html.match(/class="card[ "]/g) ?? []).length >= pagedSlugs.length);
});

test("unknown project slug and a note-tier project do not get a page", async () => {
  assert.equal((await render("/projects/does-not-exist")).status, 404);
});
