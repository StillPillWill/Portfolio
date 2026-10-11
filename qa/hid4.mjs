import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h });
  for (const route of ["/projects/vulcan", "/projects/csi", "/projects/ender3-2", "/projects/team-3598", "/projects/smud-solar-regatta", "/"]) {
    await p.goto("http://localhost:4174" + route, { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 700));
    // human-like: wheel-scroll down in steps and pause
    const total = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 400) { await p.mouse.wheel({ deltaY: 400 }); await new Promise(r => setTimeout(r, 120)); }
    await new Promise(r => setTimeout(r, 800));
    const left = await p.evaluate(() => [...document.querySelectorAll("[data-reveal]:not(.is-in)")].map(e => e.tagName + "." + e.className.slice(0, 30)));
    console.log(w, route, "unrevealed:", left.length, left.slice(0, 3).join(" | "));
  }
  await p.close();
}
await b.close();
