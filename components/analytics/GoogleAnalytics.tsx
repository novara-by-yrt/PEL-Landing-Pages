"use client";

import Script from "next/script";
import { Suspense, useEffect, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getCookieConsentSnapshot,
  getServerCookieConsentSnapshot,
  subscribeToCookieConsent,
} from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Records a page_view on client-side navigation.
 *
 * The first page_view comes from the `config` call in the inline snippet
 * below. Every navigation after that is a React route change — no document
 * load, so gtag never hears about it and the whole site would report as one
 * pageview per session. Sent manually here instead.
 *
 * In its own component because useSearchParams opts the subtree into client
 * rendering, and this subtree is three lines of nothing rather than the page.
 */
function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * GA4, wired for a site whose ranking depends on its mobile Core Web Vitals.
 *
 * Three decisions, all of them about cost:
 *
 * 1. **Nothing loads before consent.** gtag.js is ~90KB of script and a
 *    third-party connection; a visitor who has not accepted cookies pays for
 *    neither, and no analytics cookie is written. That is what UK PECR
 *    requires anyway — analytics is not a "strictly necessary" cookie — so
 *    the compliant option and the fast one are the same option here.
 *
 * 2. **`lazyOnload`, not `afterInteractive`.** The tag is fetched after the
 *    window load event, which puts it strictly behind LCP, behind the hero
 *    video, and outside the window INP is measured in on a cold mobile load.
 *    The trade is that a visitor who leaves within the first second or two
 *    may go uncounted; for a clinic site measuring enquiries rather than
 *    bounces, a slightly conservative session count is worth more than the
 *    render-time contention.
 *
 * 3. **Consent Mode v2 defaults are declared before anything else.** The
 *    `default` call is queued into dataLayer ahead of the library so that if
 *    the tag ever does load in a denied state — a future change, a second
 *    tag, Google Tag Manager arriving later — it starts cookieless rather
 *    than starting permissive and being corrected afterwards.
 *
 * Renders nothing at all when NEXT_PUBLIC_GA_ID is unset, so local
 * development and preview deployments stay out of the production property.
 */
export default function GoogleAnalytics() {
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot,
  );

  if (!GA_ID || consent !== "accepted") return null;

  return (
    <>
      <Script
        id="ga-consent-defaults"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('consent', 'update', { analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`,
        }}
      />
      <Script
        id="ga-tag"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}
