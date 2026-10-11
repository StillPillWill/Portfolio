import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:4174/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 800));
await p.evaluate(() => scrollTo({ top: document.querySelector("#work").getBoundingClientRect().top + scrollY - 80, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 1500));
const info = await p.evaluate(() =>
  [...document.querySelectorAll("#work .tile")].slice(0, 5).map((t) => {
    const m = t.querySelector(".tile-media");
    const i = t.querySelector(".tile-media img");
    const r = (e) => (e ? (({ x, y, width, height }) => [x, y, width, height].map(Math.round))(e.getBoundingClientRect()) : null);
    const cs = i ? getComputedStyle(i) : null;
    return { name: t.querySelector(".tile-name")?.textContent, tile: r(t), media: r(m), img: r(i), pos: cs && cs.position, w: cs && cs.width, h: cs && cs.height, op: cs && cs.opacity, loaded: i && i.naturalWidth };
  }),
);
console.log(JSON.stringify(info, null, 1));
await p.screenshot({ path: "qa/x/dbg.png" });
await b.close();
