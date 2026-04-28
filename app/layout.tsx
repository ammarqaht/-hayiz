import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HAYIZ — Workspace Booking for Cafés",
  description:
    "Find, book and work from the best cafés in Riyadh. HAYIZ is the premium workspace booking platform for remote professionals and inspired cafés.",
  metadataBase: new URL("https://hayiz.app"),
  openGraph: {
    title: "HAYIZ — Workspace Booking for Cafés",
    description:
      "Book a seat at the best cafés in Riyadh in seconds. Real-time availability, premium spaces, zero friction.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07060F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-ink-950 text-ink-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
