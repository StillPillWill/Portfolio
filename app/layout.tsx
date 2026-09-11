import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "William Nzive — Software, sensing, and machines",
  description:
    "William Nzive is a Computer Science and Engineering student at UC Davis building embedded software, robotics, and physical systems.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://williamn.site"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "William Nzive",
    "William Nzive portfolio",
    "UC Davis Computer Science and Engineering",
    "Wi-Fi CSI sensing",
    "ESP32 firmware",
    "native USB capture",
    "6-axis robot arm",
    "Vulcan CAD",
    "Ender3-2 3D printer",
    "Team 3598 robotics",
    "machine learning",
    "signal processing",
    "hardware engineer California",
    "robotics engineering student",
  ],
  authors: [{ name: "William Nzive", url: "https://williamn.site" }],
  creator: "William Nzive",
  publisher: "William Nzive",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "William Nzive — Software, sensing, and machines",
    description:
      "Computer Science & Engineering student at UC Davis building embedded software, robotics kinematics, and sensor pipelines.",
    url: "https://williamn.site",
    siteName: "William Nzive",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1731, height: 909, alt: "William Nzive — software, sensing, and machines" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Nzive — Software, sensing, and machines",
    description:
      "Computer Science & Engineering student at UC Davis building embedded software, robotics kinematics, and sensor pipelines.",
    site: "@StillPillWill",
    creator: "@StillPillWill",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://williamn.site/#person",
      name: "William Nzive",
      url: "https://williamn.site",
      image: "https://williamn.site/og.jpg",
      jobTitle: "Computer Science & Engineering Student & Systems Builder",
      description:
        "Undergraduate Computer Science and Engineering student at UC Davis building embedded software, robotics, and physical systems.",
      affiliation: {
        "@type": "EducationalOrganization",
        name: "University of California, Davis",
        url: "https://www.ucdavis.edu",
      },
      sameAs: [
        "https://github.com/StillPillWill",
        "https://www.linkedin.com/in/william-nzive/",
      ],
      knowsAbout: [
        "Embedded Systems",
        "Wi-Fi Channel State Information (CSI) Sensing",
        "ESP32 Firmware & Native USB",
        "Robotics Kinematics",
        "6-Axis Articulated Arm Design",
        "Mechanical CAD (Creo, SolidWorks, Onshape)",
        "3D Printing & CNC Machining",
        "Machine Learning & Deep Learning",
        "Signal Processing",
        "C and C++",
        "Python",
        "Rust",
        "FIRST Robotics Competition",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://williamn.site/#website",
      url: "https://williamn.site",
      name: "William Nzive Portfolio & Engineering Records",
      publisher: {
        "@id": "https://williamn.site/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://williamn.site/#profilepage",
      url: "https://williamn.site",
      name: "William Nzive — Software, sensing, and machines",
      isPartOf: {
        "@id": "https://williamn.site/#website",
      },
      about: {
        "@id": "https://williamn.site/#person",
      },
      mainEntity: {
        "@id": "https://williamn.site/#person",
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/manrope-variable.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/dm-mono-regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
