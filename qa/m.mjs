import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
for (const [w, h] of [[390, 844], [360, 640], [390, 700]]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h, isMobile: true, hasTouch: true });
  await p.goto("http://localhost:4174/", { waitUntil: "networkidle2" }); await new Promise(r => setTimeout(r, 1500));
  const r = await p.evaluate(() => { const t = document.querySelector(".hero-kicker").getBoundingClientRect(); const hh = document.querySelector(".hero").getBoundingClientRect(); return { scrollY, kickerTop: Math.round(t.top), heroH: Math.round(hh.height), hdr: document.querySelector("header")?.getBoundingClientRect().height }; });
  console.log(w, h, JSON.stringify(r), r.kickerTop >= r.hdr ? "OK clear of header" : "CLIPPED");
  if (w === 390 && h === 844) await p.screenshot({ path: "qa/x/m-fresh.png" });
}
await b.close();
