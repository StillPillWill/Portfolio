import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, pagedProjects } from "../../../content";
import { ProjectPage } from "../../components/ProjectPage";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://williamn.site";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.href) return {};
  const title = p.seo?.title ?? `${p.name} · William Nzive`;
  const description = p.seo?.description ?? p.summary;
  return {
    title,
    description,
    alternates: { canonical: p.href },
    openGraph: { title: p.seo?.ogTitle ?? title, description: p.seo?.ogDescription ?? description, url: `${SITE}${p.href}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.href) notFound();
  return <ProjectPage project={p} />;
}
