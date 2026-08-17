import type { Metadata } from "next";
import { Work_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import "./design-system.css";
import "./layout-chrome.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/shared/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import OnLoadPopupForm from "@/components/forms/OnLoadPopupForm";
import { buildOrganizationSchema, buildMedicalBusinessSchema } from "@/lib/schema";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

// ── Fonts ────────────────────────────────────────────────────────────────
// Brand pairing per the Perfect Eyes design system: Newsreader (display)
// + Work Sans (body). Self-hosted via next/font, so both are preloaded with
// size-adjusted fallbacks and contribute no layout shift.
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

// The design-system display face. Self-hosted via next/font so it is preloaded
// alongside the HTML — it previously arrived through a render-blocking
// @import of fonts.googleapis.com inside an inline <style> tag.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

// ── Site-wide default metadata ─────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Perfect Eyes Ltd | Expert Eye & Aesthetic Treatments",
    template: "%s | Perfect Eyes Ltd",
  },
  description:
    "Perfect Eyes Ltd offers expert cosmetic eye surgery, non-surgical aesthetic treatments, and skincare solutions. Discover blepharoplasty, tear trough fillers, polynucleotides, and more.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Perfect Eyes Ltd",
    locale: "en_GB",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

// ── Organisation JSON-LD (global, every page) ──────────────────────────────
const orgSchema = buildOrganizationSchema();
const clinicSchema = buildMedicalBusinessSchema();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${workSans.variable} ${newsreader.variable}`}>
      <head>
        {/* The hero's poster frame and video clip both come from Wistia, and
            the request for them is only issued once React has hydrated and
            HeroVideo's effect has run. By then the DNS lookup and TLS
            handshake for two cross-origin hosts are pure added latency on the
            critical path to the largest thing on the page. Warming both
            connections in the document head moves that handshake into the
            time the browser is already spending parsing HTML - on a 4G phone
            it is the cheapest few hundred milliseconds of LCP available here.

            preconnect rather than preload: the clip must not compete for
            bandwidth with the fonts and CSS, it just must not wait for a
            handshake when its turn comes. */}
        <link rel="preconnect" href="https://fast.wistia.com" />
        <link rel="preconnect" href="https://embed-ssl.wistia.com" />
        <link rel="dns-prefetch" href="https://fast.wistia.com" />
        <link rel="dns-prefetch" href="https://embed-ssl.wistia.com" />

        {/* Inline JSON-LD - no render-blocking, no async needed */}
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* The clinic as a medical entity - address, hours, speciality and
            rating. Site-wide rather than home-only, so any page a search
            engine lands on can resolve the @id the procedure and physician
            records point at. */}
        <script
          id="schema-clinic"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
        />
      </head>
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <div id="footer-spacer" aria-hidden="true" />
        <Footer />
        <CookieConsent />
        {/* On-load enquiry popup - opens once a week, after a delay,
            so it never competes with first paint. */}
        <OnLoadPopupForm />
        {/* Reads the same consent store the banner writes to, and stays
            inert - no script, no connection - until that store says
            "accepted". */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
