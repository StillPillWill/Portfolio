import type { Metadata } from "next";
import { ProjectJourney } from "../../components/ProjectJourney";

export const metadata: Metadata = {
  title: "Team 3598 Robotics Captaincy & Outreach · William Nzive",
  description:
    "Technical direction, swerve drive kinematics, FIRST Impact Award qualification, and STEM outreach reaching 4,452 students across Northern California.",
  alternates: {
    canonical: "/projects/team-3598",
  },
  openGraph: {
    title: "Team 3598 — Robotics Leadership & Outreach · William Nzive",
    description:
      "Former captain coordinating 40+ students across kinematics, fabrication, competition preparation, and outreach reaching 4,452 students.",
    url: "https://williamn.site/projects/team-3598",
  },
};

export default function TeamProjectPage() {
  return <ProjectJourney projectKey="team-3598" />;
}
