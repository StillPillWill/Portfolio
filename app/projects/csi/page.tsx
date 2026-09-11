import type { Metadata } from "next";
import { ProjectJourney } from "../../components/ProjectJourney";

export const metadata: Metadata = {
  title: "CSI Audio Sensing Research · Wi-Fi RF Capture & ML · William Nzive",
  description:
    "ESP32 firmware, native USB 10,839 records/s transport, and deep learning pipeline achieving 90% speaker recognition across 4.6B packets and 98 hours of audio.",
  alternates: {
    canonical: "/projects/csi",
  },
  openGraph: {
    title: "CSI Research — Audio Sensing through Wi-Fi CSI · William Nzive",
    description:
      "ESP32 firmware, native USB transport (10,839 records/s), and PyTorch ML models capturing 4.6 billion packets to investigate RF audio sensing.",
    url: "https://williamn.site/projects/csi",
  },
};

export default function CsiProjectPage() {
  return <ProjectJourney projectKey="csi" />;
}
