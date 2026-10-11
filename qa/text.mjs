// Render routes from the built worker and save normalized visible text. Usage: node qa/text.mjs <outDir> [routes...]
import fs from "node:fs";
const out = process.argv[2];
const routes = process.argv.slice(3);
fs.mkdirSync(out, { recursive: true });
const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href + "?t=" + Date.now());
const ents = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#39;": "'", "&apos;": "'" };
for (const r of routes) {
  const res = await worker.fetch(new Request("http://localhost" + r, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("nf", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  let h = await res.text();
  const title = (h.match(/<title>([^<]*)/) ?? [])[1] ?? "";
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? "";
  h = h.replace(/<(script|style)[\s\S]*?<\/\1>/g, "").replace(/<head>[\s\S]*?<\/head>/, "");
  const body = h.replace(/<\/(p|div|li|h[1-6]|section|article|header|footer|dd|dt|summary|figcaption|a)>/g, "\n").replace(/<[^>]+>/g, " ").replace(/&[#\w]+;/g, (m) => ents[m] ?? m);
  const lines = body.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
  fs.writeFileSync(`${out}/${r === "/" ? "home" : r.slice(1).replace(/\//g, "_")}.txt`, `TITLE: ${title}\nDESC: ${desc}\n` + lines.join("\n") + "\n");
}
