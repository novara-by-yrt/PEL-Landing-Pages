import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { buildOrganizationSchema } from "@/lib/schema";

// ── Fonts (zero CLS — preloaded, no FOUT) ─────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

// ── Site-wide default metadata ─────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Skynology | Expert Eye & Aesthetic Treatments",
    template: "%s | Skynology",
  },
  description:
    "Skynology offers expert cosmetic eye surgery, non-surgical aesthetic treatments, and skincare solutions. Discover blepharoplasty, tear trough fillers, polynucleotides, and more.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Skynology",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// ── Organisation JSON-LD (global, every page) ──────────────────────────────
const orgSchema = buildOrganizationSchema();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Inline JSON-LD — no render-blocking, no async needed */}
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
