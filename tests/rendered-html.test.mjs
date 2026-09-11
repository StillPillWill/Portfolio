import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("homepage server-renders the portfolio shell", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>William Nzive/i);
  assert.match(html, /Skip to selected work/);
  assert.match(html, /Selected work/);
  assert.match(html, /Three systems, built end to end/);
  assert.match(html, /More builds/);
  assert.match(html, /Wi-Fi CSI sensing/);
  assert.match(html, /Vulcan/);
  assert.match(html, /Ender3-2/);
  assert.match(html, /Team 3598/);
  assert.match(html, /williamnzive2007@gmail\.com/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /Research roles and independent builds/);
  assert.match(html, /DaTscan/);
  assert.match(html, /UCSC Science Internship Program/);
  // No stale starter/skeleton scaffolding should leak into the real site.
  assert.doesNotMatch(html, /Your site is taking shape/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});

test("project dossiers server-render with notes and next-project nav", async () => {
  for (const [pathname, name] of [
    ["/projects/csi", "CSI Research"],
    ["/projects/vulcan", "Vulcan"],
    ["/projects/ender3-2", "Ender3-2"],
    ["/projects/team-3598", "Team 3598"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, /Project notes/);
    assert.match(html, /Next project/);
  }
});
