import type { MetadataRoute } from "next";
import { pagedProjects } from "../content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williamn.site";
  const now = new Date();
  const page = (path: string, changeFrequency: "weekly" | "monthly", priority: number) => ({ url: `${base}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("/", "weekly", 1),
    page("/projects", "weekly", 0.9),
    ...pagedProjects.map((p) => page(p.href as string, "monthly", p.tier === "flagship" ? 0.9 : 0.7)),
    page("/experience", "monthly", 0.7),
    page("/about", "monthly", 0.6),
    page("/contact", "monthly", 0.6),
  ];
}
