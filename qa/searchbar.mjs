import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
for (const [w, path, name] of [[1440, "/", "sb-home"], [1440, "/projects", "sb-proj"], [390, "/", "sb-m"]]) {
  await p.setViewport({ width: w, height: 900, deviceScaleFactor: 2 });
  await p.goto("http://localhost:4174" + path, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 600));
  await p.evaluate(() => document.querySelector(".explorer-bar").scrollIntoView({ block: "center", behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 700));
  const clip = await p.evaluate(() => { const x = document.querySelector(".explorer-bar").getBoundingClientRect(); return { x: 0, y: Math.max(0, x.top + scrollY - 16), width: innerWidth, height: x.height + 32 }; });
  const lines = await p.evaluate(() => {
    const bar = document.querySelector(".explorer-bar").getBoundingClientRect();
    const out = [];
    for (const e of document.querySelectorAll("*")) {
      for (const ps of [null, "::before", "::after"]) {
        const cs = getComputedStyle(e, ps);
        if (ps && cs.content === "none") continue;
        const r = e.getBoundingClientRect();
        const h = parseFloat(cs.height);
        if (ps && cs.position === "absolute" && h <= 2 && r.width > 0) {
          const off = e.closest(".explorer-bar") ? "in-bar" : "outside";
          out.push(`${ps} of ${e.className || e.tagName} pos=${cs.position} bottom=${cs.bottom} parentPos=${getComputedStyle(e).position} ${off}`);
        }
      }
    }
    return { barTop: Math.round(bar.top), barBottom: Math.round(bar.bottom), lines: out.filter((l) => /explorer|section|work|page/.test(l)).slice(0, 8) };
  });
  console.log(name, JSON.stringify(lines));
  await p.screenshot({ path: `qa/x/${name}.png`, clip });
}
await b.close();
