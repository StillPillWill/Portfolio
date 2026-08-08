import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noah / Studio — Ideas with gravity",
  description: "Noah is an independent digital designer building identities, products, and spaces for brands with something real to say.",
  metadataBase: new URL("https://noah.studio"),
  openGraph: {
    title: "Noah / Studio — Ideas with gravity",
    description: "Independent digital designer building identities, products, and spaces with gravity.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noah / Studio — Ideas with gravity",
    description: "Independent digital designer building identities, products, and spaces with gravity.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
