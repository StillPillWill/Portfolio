import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const p = await b.newPage();
const out = [];
for (const [w, h] of [[1440, 900], [1100, 800], [820, 900], [390, 844]]) {
  await p.setViewport({ width: w, height: h });
  for (const q of ["", "?cat=ml", "?cat=systems", "?cat=robotics", "?cat=fabrication", "?cat=research", "?q=c"]) {
    await p.goto("http://localhost:4174/projects" + q, { waitUntil: "networkidle2" }); await new Promise(r => setTimeout(r, 500));
    const rows = await p.evaluate(() => {
      const t = [...document.querySelectorAll(".tiles-wall .tile")].map(e => e.getBoundingClientRect());
      const byY = {}; for (const r of t) (byY[Math.round(r.y)] ??= []).push(r);
      const L = Math.min(...t.map(r => r.left)), R = Math.max(...t.map(r => r.right));
      return { n: t.length, rows: Object.values(byY).map(rs => ({ gapRight: Math.round(R - Math.max(...rs.map(r => r.right))), gapLeft: Math.round(Math.min(...rs.map(r => r.left)) - L), k: rs.length })) };
    });
    if (!rows.n) continue;
    const bad = rows.rows.filter(r => r.gapRight > 2 || r.gapLeft > 2);
    out.push(bad.length ? `HOLE ${w} ${q || "/"} ${JSON.stringify(bad)}` : `ok ${w} ${q || "all"} (${rows.n} tiles, ${rows.rows.length} rows)`);
  }
}
console.log(out.join("\n"));
await b.close();
