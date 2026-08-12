import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William Nzive — Systems, Signals, Machines",
  description: "William Nzive is a CSE student at UC Davis working across embedded sensing, software systems, mechanical design, and fabrication.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
