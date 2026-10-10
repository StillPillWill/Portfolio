import type { Metadata } from "next";
import { ProjectPage } from "../../components/ProjectPage";

export const metadata: Metadata = {
  title: "Team 3598 Robotics Captaincy & Outreach · William Nzive",
  description:
    "Team captaincy, mechanical design reviews, FIRST Impact Award, World Championship qualification, and STEM outreach reaching 4,452 students across Sacramento.",
  alternates: {
    canonical: "/projects/team-3598",
  },
  openGraph: {
    title: "Team 3598 — Robotics Leadership & Outreach · William Nzive",
    description:
      "Former captain coordinating 40+ students across design, manufacturing, competition operations, and outreach reaching 4,452 students.",
    url: "https://williamn.site/projects/team-3598",
  },
};

export default function TeamProjectPage() {
  return <ProjectPage projectKey="team-3598" />;
}
