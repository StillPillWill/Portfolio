// Interaction + graphics verification. Usage: node qa/interact.mjs [base]
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const BASE = process.argv[2] ?? "http://localhost:4174";
const OUT = "qa/i";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: process.env.SOFTWARE ? ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] : ["--enable-gpu", "--ignore-gpu-blocklist"] });
await browser.defaultBrowserContext().overridePermissions(BASE, ["clipboard-read", "clipboard-write", "clipboard-sanitized-write"]);
const results = [];
const check = (name, ok, extra = "") => { results.push({ name, ok: !!ok, extra }); console.log(ok ? "PASS" : "FAIL", name, extra); };

// pixel signature of a canvas region
const sig = (page, sel) => page.evaluate((sel) => {
  const c = document.querySelector(sel);
  const x = c.getContext("2d");
  const d = x.getImageData(0, 0, c.width, c.height).data;
  let nz = 0, sum = 0;
  for (let i = 0; i < d.length; i += 16) { if (d[i + 3] > 0) nz++; sum = (sum + d[i] * 3 + d[i + 1] * 5 + d[i + 2] + d[i + 3]) % 1e9; }
  return { nz, sum };
}, sel);

async function canvasTest(page, name, canvasSel, boxSel, move) {
  const el = await page.$(boxSel);
  await el.scrollIntoView();
  await wait(1200);
  const box = await (await page.$(canvasSel)).boundingBox();
  const a = await sig(page, canvasSel);
  check(`${name}: draws pixels`, a.nz > 200, `nonzero=${a.nz}`);
  const f1 = await page.evaluate((s) => +document.querySelector(s).dataset.frames, canvasSel);
  await wait(800);
  const f2 = await page.evaluate((s) => +document.querySelector(s).dataset.frames, canvasSel);
  const ms = await page.evaluate((s) => +document.querySelector(s).dataset.ms, canvasSel);
  check(`${name}: loop alive`, f2 > f1, `frames ${f1}->${f2}`);
  check(`${name}: draw cost within 8ms budget`, ms < 8, `${ms}ms avg`);
  await (await page.$(canvasSel)).screenshot({ path: `${OUT}/${name}-1.png` });
  // pointer response: compare against same time without pointer is noisy, so measure variance introduced
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.5);
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5, { steps: 6 });
  await wait(500);
  await (await page.$(canvasSel)).screenshot({ path: `${OUT}/${name}-2.png` });
  await move?.(page, box);
  await wait(600);
  await (await page.$(canvasSel)).screenshot({ path: `${OUT}/${name}-3.png` });
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await page.goto(BASE + "/", { waitUntil: "networkidle2" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
await wait(1500);

// hero collage
const cy = () => page.$$eval(".collage-track", (els) => els.map((e) => new DOMMatrix(getComputedStyle(e).transform).m42));
const c1 = await cy();
await wait(2000);
const c2 = await cy();
check("collage: photos drift (every column moves)", c1.length >= 3 && c1.every((v, i) => Math.abs(v - c2[i]) > 5), `${c1.join(",")} -> ${c2.join(",")}`);
check("collage: images loaded", (await page.$$eval(".collage img", (e) => e.filter((i) => i.complete && i.naturalWidth > 0).length)) >= 30);
check("collage: tiles link to real projects", (await page.$$eval(".collage-tile", (e) => e.every((a) => /^\/projects\/[a-z0-9-]+$/.test(a.getAttribute("href") ?? "")))));
await page.mouse.move(1300, 150);
await wait(600);
const px = await page.$eval(".hero", (e) => +e.style.getPropertyValue("--mx"));
await page.mouse.move(150, 750);
await wait(600);
const px2 = await page.$eval(".hero", (e) => +e.style.getPropertyValue("--mx"));
check("collage: pointer parallax responds", px > 0.3 && px2 < -0.3, `${px} / ${px2}`);
const pt = await page.evaluate(() => {
  for (const t of document.querySelectorAll(".collage-tile")) {
    const r = t.getBoundingClientRect();
    const x = r.x + r.width / 2, y = r.y + r.height / 2;
    if (x > 900 && x < 1380 && y > 120 && y < 780 && document.elementFromPoint(x, y)?.closest(".collage-tile") === t) return { x, y };
  }
  return null;
});
check("collage: a tile is visible and reachable on the right of the hero", pt !== null);
await page.mouse.move(pt.x, pt.y);
await wait(450);
check("collage: hovered photo brightens and shows its project", await page.$eval(".collage-tile:hover", (e) => +getComputedStyle(e).opacity > 0.95 && +getComputedStyle(e.querySelector(".collage-cap")).opacity > 0.9));
check("collage: headline sits above collage and stays clickable", await page.$eval(".hero-cta .btn", (e) => { const r = e.getBoundingClientRect(); return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest(".btn") === e; }));
await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
await wait(500);
check("collage: pauses off-screen", await page.$eval(".hero", (e) => e.classList.contains("is-offscreen")));
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await wait(500)

// spectrogram
await canvasTest(page, "spectro", ".fx-spectro canvas", ".chapter-csi");
const vad = await page.$eval(".fx-vad", (e) => e.textContent);
check("spectro: VAD readout present", ["speech", "silence"].includes(vad), vad);

// mesh: wait for sweep complete, verify readout
await (await page.$(".chapter-ender3-2")).scrollIntoView();
await wait(1500);
const mid = await page.$eval(".fx-mesh .fx-hud", (e) => e.textContent);
await wait(9500);
const done = await page.$eval(".fx-mesh .fx-hud", (e) => e.textContent);
check("mesh: probing counter advances then finishes", /probing/.test(mid) || /Z offset/.test(mid) ? /Z offset/.test(done) : false, `${mid.trim()} -> ${done.trim()}`);
await canvasTest(page, "mesh", ".fx-mesh canvas", ".chapter-ender3-2", async (p, b) => {
  await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await p.mouse.down();
  await p.mouse.move(b.x + b.width / 2 + 160, b.y + b.height / 2 - 60, { steps: 10 });
  await p.mouse.up();
});
const h2 = await page.$eval(".fx-mesh .fx-hud", (e) => e.textContent);
check("mesh: hover readout shows bilinear Z", /Z offset/.test(h2), h2.trim());

// particles
await canvasTest(page, "particles", ".fx-particles canvas", ".chapter-team-3598", async (p, b) => { await p.mouse.click(b.x + b.width / 2, b.y + b.height / 2); });
await wait(3500);
{
  await page.mouse.move(5, 5);
  await wait(800);
  await (await page.$(".fx-particles canvas")).screenshot({ path: `${OUT}/particles-settled.png` });
}

// counters final values
await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } });
await wait(2200);
const counts = await page.$$eval(".chapter .stat dd", (els) => els.map((e) => e.textContent));
check("counters land on true values", counts.join("|") === ["90%", "4.6B", "10,839", "$40", "6", "1:16", "32 N·m", "⅓", "585 × 775", "216", "$16", "64 h", "40+", "5", "4,452", "Impact"].join("|"), counts.join("|"));

// "Also built" cards match the /projects cards
await page.evaluate(() => document.querySelector("#more").scrollIntoView());
await wait(600);
check("home: 'Also built' uses the shared project cards", (await page.$$eval("#more .card", (e) => e.length)) >= 4 && (await page.$$("#more .index-row")).length === 0);
check("home: card links go to project pages", await page.$$eval("#more a.card-link", (e) => e.length > 0 && e.every((a) => /^\/projects\/[a-z0-9-]+$/.test(a.getAttribute("href")))));
check("home: 'All N projects' link present", (await page.$eval("#more .section-aside a", (a) => /All \d+ projects/.test(a.textContent) && a.getAttribute("href") === "/projects")));

// accordion (experience page keeps the expandable rows)
await page.goto(BASE + "/experience", { waitUntil: "networkidle2" });
await wait(800);
await page.evaluate(() => document.querySelector(".index-row").scrollIntoView({ behavior: "instant", block: "center" }));
await wait(600);
await page.click(".index-row summary");
await wait(600);
check("accordion opens", await page.$eval(".index-row details", (d) => d.open));
check("accordion body visible", await page.$eval(".index-row .index-body", (e) => e.getBoundingClientRect().height > 60 && getComputedStyle(e).opacity === "1"));
await page.goto(BASE + "/", { waitUntil: "networkidle2" });
await wait(1200);

// timeline fill
await page.evaluate(() => document.querySelector(".timeline").scrollIntoView({ block: "end" }));
await wait(300);
await page.mouse.wheel({ deltaY: 40 });
await wait(500);
const prog = await page.$eval(".timeline", (e) => parseFloat(e.style.getPropertyValue("--progress")));
check("timeline spine fills with scroll", prog > 0.5, `progress=${prog}`);

// copy email
await page.evaluate(() => document.querySelector("#contact").scrollIntoView());
await wait(800);
await page.click(".copy-btn");
await wait(300);
check("copy email: label changes", (await page.$eval(".copy-btn", (e) => e.textContent)) === "Copied");
check("copy email: clipboard has address", (await page.evaluate(() => navigator.clipboard.readText())) === "williamnzive2007@gmail.com");

// project page gallery lightbox
await page.goto(BASE + "/projects/ender3-2", { waitUntil: "networkidle2" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
await page.evaluate(() => document.querySelector(".gallery").scrollIntoView());
await wait(800);
await page.click(".gallery-item:nth-child(2) .gallery-btn");
await wait(500);
check("lightbox opens", await page.$eval("dialog.lightbox", (d) => d.open));
await page.keyboard.press("ArrowRight");
await wait(200);
const cap = await page.$eval(".lightbox-fig figcaption", (e) => e.textContent);
check("lightbox arrow key advances", /03/.test(cap), cap);
await page.keyboard.press("Escape");
await wait(400);
check("lightbox Esc closes", !(await page.$eval("dialog.lightbox", (d) => d.open)));

// mobile menu
const m = await browser.newPage();
await m.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await m.goto(BASE + "/projects/vulcan", { waitUntil: "networkidle2" });
check("mobile: nav hidden before open", !(await m.$eval(".nav", (e) => getComputedStyle(e).visibility !== "hidden")));
await m.tap(".menu-btn");
await wait(500);
check("mobile: menu opens", await m.$eval(".nav", (e) => getComputedStyle(e).visibility === "visible" && e.getBoundingClientRect().left >= 0 && e.getBoundingClientRect().right <= 391));
await m.screenshot({ path: `${OUT}/mobile-menu.png` });
await m.keyboard.press("Escape");
await wait(500);
check("mobile: Esc closes menu", await m.$eval(".nav", (e) => getComputedStyle(e).visibility === "hidden"));

// reduced motion
const r = await browser.newPage();
await r.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await r.setViewport({ width: 1440, height: 900 });
await r.goto(BASE + "/", { waitUntil: "networkidle2" });
await wait(1500);
const ra = await r.$eval(".collage-track", (c) => getComputedStyle(c).animationName);
const rpos1 = await r.$eval(".collage-track", (c) => getComputedStyle(c).transform);
await wait(1200);
const rpos2 = await r.$eval(".collage-track", (c) => getComputedStyle(c).transform);
check("reduced motion: collage is a still frame", ra === "none" && rpos1 === rpos2, `${ra} ${rpos1} ${rpos2}`);
check("reduced motion: reveal content visible", (await r.$$eval("[data-reveal]", (els) => els.filter((e) => getComputedStyle(e).opacity < 1).length)) === 0);

check("no console/page errors", errs.length === 0, errs.slice(0, 3).join(" | "));
fs.writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 1));
console.log(`\n${results.filter((x) => x.ok).length}/${results.length} passed`);
await browser.close();
