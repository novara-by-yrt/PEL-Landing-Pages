import type { Metadata } from "next";
import { Work_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import "./design-system.css";
import "./layout-chrome.css";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/shared/CookieConsent";
import Tracking from "@/components/analytics/Tracking";
import OnLoadPopupForm from "@/components/forms/OnLoadPopupForm";
import StickyCallbackBar from "@/components/shared/StickyCallbackBar";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
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

// Also read directly in components/analytics/Tracking.tsx, which renders the
// scripts these IDs belong to - duplicated here only because the noscript
// fallbacks below have to live at the top of <body>, not inside that component.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Perfect Eyes Clinic | Expert Eye & Aesthetic Treatments",
    template: "%s | Perfect Eyes Clinic",
  },
  description:
    "Perfect Eyes Clinic offers expert cosmetic eye surgery, non-surgical aesthetic treatments, and skincare solutions. Discover blepharoplasty, tear trough fillers, polynucleotides, and more.",
  /* Every page here is a paid-traffic landing page, so none of them belong
     in organic search: they would compete with the clinic's own site for the
     same terms, on thinner copy written for one ad. Set once on the root
     layout so a new page is noindex by default rather than by remembering.
     robots.txt still allows crawling — a page that cannot be fetched is a
     page whose noindex is never read. */
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Perfect Eyes Clinic",
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
        {/* The hero's poster and clip come from two Wistia origins whose
            handshake would otherwise land on the critical path right after
            hydration, when HeroVideo's player script loads (next/script,
            `afterInteractive` — the video is expected to already be playing
            by the time a visitor sees the page, not something that starts
            seconds later, so this can't be deferred the way a truly
            optional script could be). Warming the DNS lookup and TLS
            handshake here means that request isn't also paying for the
            connection setup.

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
        {/* Noscript fallbacks for GTM and the Meta Pixel - both tools require
            these as high in <body> as possible for the no-JS case, per their
            own setup instructions. The scripts that do the real work are in
            <Tracking />, further down. */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        {FB_PIXEL_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <main id="main-content">{children}</main>
        <Footer />
        <CookieConsent />
        {/* Persistent bottom-centre "Request a call back" trigger. Sits below
            the cookie banner in z-order, so consent is answered first. */}
        <StickyCallbackBar />
        <WhatsAppButton />
        {/* On-load enquiry popup - opens once a week, after a delay,
            so it never competes with first paint. */}
        <OnLoadPopupForm />
        <Tracking />
      </body>
    </html>
  );
}
