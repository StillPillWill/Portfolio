import type { Metadata } from "next";
import ProjectsPage from "../projects/page";

export const metadata: Metadata = {
  title: "Projects · William Nzive",
  alternates: { canonical: "/projects" },
  robots: { index: false, follow: true },
};

export default ProjectsPage;
