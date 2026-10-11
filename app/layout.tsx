import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RevealObserver } from "./components/RevealObserver";

export const viewport: Viewport = {
  themeColor: "#0e0d0b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "William Nzive | Computer Science & Engineering",
  description:
    "William Nzive is a Computer Science and Engineering student at UC Davis who learns what a problem needs and builds it. Projects span software, machine learning, embedded systems, robotics, and fabrication.",
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
    title: "William Nzive | Computer Science & Engineering",
    description:
      "Computer Science & Engineering student at UC Davis. Builds and measures hard things across software, ML, electronics, and mechanical design.",
    url: "https://williamn.site",
    siteName: "William Nzive",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1731, height: 909, alt: "William Nzive | Computer Science & Engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Nzive | Computer Science & Engineering",
    description:
      "Computer Science & Engineering student at UC Davis. Builds and measures hard things across software, ML, electronics, and mechanical design.",
    images: ["/og.jpg"],
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }], shortcut: "/favicon.ico" },
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
        "Undergraduate Computer Science and Engineering student at UC Davis. Projects in software, machine learning, embedded systems, robotics, and fabrication demonstrate a general ability to learn and build.",
      affiliation: {
        "@type": "EducationalOrganization",
        name: "University of California, Davis",
        url: "https://www.ucdavis.edu",
      },
      sameAs: [
        "https://github.com/StillPillWill",
        "https://www.linkedin.com/in/william-nzive-622226376/",
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
      name: "William Nzive | Computer Science & Engineering",
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
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        <script
          // mark JS before first paint so reveal styles never hide content for no-JS visitors
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.replace('no-js','js')" }}
        />
        <link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body id="top">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
