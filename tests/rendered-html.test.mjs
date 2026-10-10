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

const ROUTES = ["/", "/projects", "/projects/csi", "/projects/vulcan", "/projects/ender3-2", "/projects/team-3598", "/experience", "/about", "/contact", "/work"];

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
