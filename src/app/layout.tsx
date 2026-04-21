import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Metricline Group of Industries",
    template: "%s | Metricline Group",
  },
  description:
    "Metricline Group delivers integrated engineering and construction services across industrial sectors — from early concept through execution and start-up.",
  keywords: [
    "EPCM",
    "engineering",
    "construction management",
    "procurement",
    "industrial",
    "oil and gas",
    "Alberta",
    "Calgary",
    "Metricline",
  ],
  authors: [{ name: "Metricline Projects Ltd." }],
  creator: "Metricline Projects Ltd.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Metricline Group of Industries",
    title: "Metricline Group of Industries",
    description:
      "Integrated EPCM services across Alberta, Saskatchewan, and BC.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="min-h-full flex flex-col bg-group-bg text-group-text">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
