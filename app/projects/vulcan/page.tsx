import type { Metadata } from "next";
import { ProjectPage } from "../../components/ProjectPage";

export const metadata: Metadata = {
  title: "Vulcan 6-Axis Robot Arm · Mechanical Design Study · William Nzive",
  description:
    "Complete open-source 6-axis robot arm CAD architecture featuring 1:16 belt reductions, differential wrist mechanism, and printable chassis design.",
  alternates: {
    canonical: "/projects/vulcan",
  },
  openGraph: {
    title: "Vulcan — 6-Axis Robot Arm CAD Design Study · William Nzive",
    description:
      "A complete open-source six-axis robot arm design study, detailing kinematics, belt reductions, and printable structural parts in CAD.",
    url: "https://williamn.site/projects/vulcan",
  },
};

export default function VulcanProjectPage() {
  return <ProjectPage projectKey="vulcan" />;
}
