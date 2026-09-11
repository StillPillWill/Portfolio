import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "William Nzive — Software, sensing, and machines",
  description: "William Nzive is a computer science and engineering student building software, sensing systems, and machines.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "William Nzive — Software, sensing, and machines",
    description: "Software, sensing systems, and machines built with care and documented honestly.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1731, height: 909, alt: "William Nzive — software, sensing, and machines" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "William Nzive — Software, sensing, and machines",
    description: "Software, sensing systems, and machines built with care and documented honestly.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
