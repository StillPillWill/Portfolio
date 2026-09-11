import type { Metadata } from "next";
import { ProjectJourney } from "../../components/ProjectJourney";

export const metadata: Metadata = {
  title: "Ender3-2 Large-Format 3D Printer · Physical Build · William Nzive",
  description:
    "Rebuilt two basically e-waste Ender 3 printers into an expanded 585 × 775 × 230 mm Cartesian machine with custom firmware, exhibited live at Open Sauce.",
  alternates: {
    canonical: "/projects/ender3-2",
  },
  openGraph: {
    title: "Ender3-2 — Large-Format Machine Salvage & Firmware · William Nzive",
    description:
      "Salvaged and combined two failed, basically e-waste Ender 3s into an expanded 585 × 775 × 230 mm Cartesian platform with custom firmware, demonstrated live at Open Sauce.",
    url: "https://williamn.site/projects/ender3-2",
  },
};

export default function EnderProjectPage() {
  return <ProjectJourney projectKey="ender3-2" />;
}
