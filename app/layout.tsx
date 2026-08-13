import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William Nzive — Software, sensing, and machines",
  description: "William Nzive is a computer science and engineering student building software, sensing systems, and machines.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "William Nzive — Software, sensing, and machines",
    description: "Software, sensing systems, and machines built with care and documented honestly.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 936, alt: "William Nzive — software, sensing, and machines" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Nzive — Software, sensing, and machines",
    description: "Software, sensing systems, and machines built with care and documented honestly.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
