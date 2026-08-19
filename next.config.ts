import type { NextConfig } from "next";
import treatmentPaths from "./content/treatment-paths.json";
import legacyRedirects from "./content/legacy-redirects.json";

const TREATMENT_PATHS: Record<string, string> = treatmentPaths.paths;

// Old WordPress URLs whose slug changed during the migration. Without these
// every one of them 404s the day the new site goes live, taking its backlinks
// and ranking history with it. See content/legacy-redirects.json.
const LEGACY_REDIRECTS: Record<string, string> = legacyRedirects.redirects;

const nextConfig: NextConfig = {
  // Static export support — pre-render all pages at build time
  output: "standalone",

  // Every route was shipping 4+ render-blocking <link rel="stylesheet"> tags
  // (PageSpeed: ~170ms). Inlining puts the CSS straight in the HTML <head>
  // instead, cutting the request waterfall before first paint. Trade-off:
  // returning visitors lose cross-page stylesheet caching, since inlined CSS
  // re-downloads with every page — acceptable here since total CSS is small
  // (~40KB) and most traffic is new visitors arriving from search.
  experimental: {
    inlineCss: true,
  },

  // Optimise images from the migrated uploads directory
  images: {
    formats: ["image/avif", "image/webp"],
    // No external domains needed — all images are local
    remotePatterns: [],
    // Next re-encodes an optimised image once its cache entry expires, and the
    // default is 60 seconds. These are editorial photographs and clinical
    // before/afters that change when someone replaces the file, not by the
    // minute, so a long TTL turns a repeated encode into a cache hit. The
    // filename changes when the image does, so nothing goes stale.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // Permanent redirects from old WordPress URL structure
  async redirects() {
    return [
      // WP admin
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/uploads/:path*", permanent: true },

      // Common WP feed/xmlrpc
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/xmlrpc.php", destination: "/", permanent: true },

      // The gallery lives at /before-after, but the navigation calls it
      // "Results" - so /results is the URL people guess and type, and an
      // auditor hit it too. It was a 404.
      { source: "/results", destination: "/before-after", permanent: true },
      { source: "/results/:path*", destination: "/before-after/:path*", permanent: true },

      // /self-test-survey is the URL actually linked site-wide (and the one
      // the old WordPress site published); /blepharoplasty-quiz was a second,
      // unlinked page rendering the identical quiz, which would otherwise
      // split ranking signal and read as duplicate content.
      { source: "/blepharoplasty-quiz", destination: "/self-test-survey", permanent: true },

      // Treatment pages are canonical at the nested paths the previous site
      // published. The flat slugs the migration produced 301 to them so each
      // treatment has exactly one indexable URL.
      ...Object.entries(TREATMENT_PATHS).map(([flatSlug, nestedPath]) => ({
        source: `/${flatSlug}`,
        destination: `/${nestedPath}`,
        permanent: true,
      })),

      /* The journal archive paginated on ?page=N before it paginated on a
         path. Anything still holding a query-string URL lands on the page it
         asked for rather than back at post one, and the two forms cannot
         both accumulate ranking signal for the same twelve posts. */
      {
        source: "/blog",
        has: [{ type: "query", key: "page", value: "(?<page>\\d+)" }],
        destination: "/blog/page/:page",
        permanent: true,
      },

      /* Page one is /blog, so /blog/page/1 is a second address for it. It is
         a plausible enough thing to type — and to link — that answering with
         a 404 helps nobody; it resolves to the one canonical form instead. */
      { source: "/blog/page/1", destination: "/blog", permanent: true },

      // Posts and pages the migration re-slugged. The old URL is what the
      // live site publishes today and what every external link points at, so
      // each one 301s to the page that now carries the content.
      ...Object.entries(LEGACY_REDIRECTS).map(([from, to]) => ({
        source: from,
        destination: to,
        permanent: true,
      })),

      // Publications the previous site served at the site root (and one at
      // /blog). Their content used to live as standalone posts under
      // content/posts, but those were bare stub pages (a single link out to
      // PubMed, no real article) — they've been removed and the same
      // citations now live as cards on /publications with a direct external
      // link, so the old URLs point there instead of at a deleted page.
      {
        source: "/nylon-hang-sutures-repair-secondary-ptosis-overcorrected-dysthyroid-upper-eyelid-retraction",
        destination: "/publications",
        permanent: true,
      },
      {
        source: "/stability-of-eyelid-height-after-graded-anterior-approach-lid-lowering-for-dysthyroid-upper-lid-retraction",
        destination: "/publications",
        permanent: true,
      },
      {
        source: "/two-new-cases-of-metastatic-basal-cell-carcinoma-from-the-eyelids",
        destination: "/publications",
        permanent: true,
      },
      {
        source:
          "/blog/periorbital-venous-stasis-may-be-involved-with-filler-induced-malar-edema-a-duplex-ultrasound%e2%80%90imaging%e2%80%90based-case-series",
        destination: "/publications",
        permanent: true,
      },
    ];
  },

  // Compress response
  compress: true,

  // Strict mode for better React error catching
  reactStrictMode: true,

  // Baseline security headers. The CSP allows 'unsafe-inline' for scripts and
  // styles because the site relies on inline JSON-LD (<script
  // type="application/ld+json">) on nearly every page and a handful of
  // inline style={{...}} attributes — a nonce-based policy would need
  // middleware and touching every one of those call sites. frame-src allows
  // YouTube specifically for the video embeds in components/home/VideoCard;
  // img-src/media-src allow Wistia's CDN for the home hero's background
  // video (components/home/HeroVideo) — its poster frame is an <img>-style
  // fetch, the actual clip is a native <video> source, both served straight
  // from Wistia rather than through this site.
  async headers() {
    const csp = [
      "default-src 'self'",
      // googletagmanager.com serves both gtm.js (components/analytics/Tracking)
      // and, dynamically from inside that GTM container, gtag.js for GA4 and
      // Google Ads — those two properties' IDs are configured in GTM's own
      // dashboard, not in this codebase, so there's nothing more specific to
      // name here for them. *.google.com/*.doubleclick.net are wildcarded
      // rather than pinned to exact hosts because Google's own conversion and
      // remarketing pings fan out across many undocumented subdomains (ccm,
      // rmkt, pagead, ad, plus country TLD variants like google.co.in) that
      // GTM calls at runtime with no fixed list — the old WordPress site hit
      // all of these too, just with no CSP at all to block them.
      // connect.facebook.net is the Meta Pixel; clarity.ms is Microsoft
      // Clarity (both the direct project and the one GTM loads); hotjar.com
      // is session recording, also GTM-configured; gstatic.com serves
      // Google's call-tracking (dynamic number swap for Ads attribution).
      // link.perfecteyesltd.com used to serve two GoHighLevel-hosted iframe
      // embeds — the self-test-survey widget and the Dr Sabrina Club join
      // form — both since replaced with native components
      // (components/forms/BlepharoplastyQuizForm.tsx and
      // components/forms/JoinClubForm.tsx), so nothing loads from that
      // domain anymore and it's dropped from every directive below.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google.com https://*.doubleclick.net https://www.googleadservices.com https://connect.facebook.net https://www.clarity.ms https://scripts.clarity.ms https://static.hotjar.com https://script.hotjar.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline'",
      // GA/Ads/Meta/Clarity/Hotjar all fall back to an image-beacon on
      // browsers that block fetch/beacon, hence the analytics origins in
      // img-src as well — Clarity's in particular (c.clarity.ms/c.gif) was
      // missing here and silently breaking its own script every load.
      // c.bing.com is Clarity's separate, documented cross-domain sync pixel
      // for its Bing Ads integration — a different domain entirely, so the
      // *.clarity.ms wildcard above doesn't cover it.
      "img-src 'self' data: blob: https://fast.wistia.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.google.com https://*.doubleclick.net https://www.facebook.com https://*.clarity.ms https://*.hotjar.com https://c.bing.com",
      "media-src 'self' https://embed-ssl.wistia.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.google.com https://*.doubleclick.net https://*.clarity.ms https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com",
      // reCAPTCHA v2's checkbox widget (components/forms/useFormSubmit.ts)
      // renders as an <iframe> from Google's own recaptcha origin — without
      // it here the widget's container div stays in the DOM but the browser
      // blocks the iframe's navigation, leaving an empty box with no
      // checkbox. recaptcha.net is Google's alternate host for regions
      // where google.com is blocked; included for the same reason the script
      // itself is allowed from both above.
      "frame-src https://www.youtube.com https://www.google.com https://recaptcha.net",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        /* Every image served straight from disk rather than through
           next/image — the logo and award badges at the public/ root, and
           the migrated /uploads/** originals that the MDX content links to
           directly with raw <img> tags (next/image never touches those, so
           images.minimumCacheTTL above doesn't apply to them). Next only
           manages caching for what it generates (/_next/*), so all of this
           was going out as `Cache-Control: public, max-age=0` — a
           conditional request on every asset, on every page, on every
           repeat visit.

           The lookahead excludes _next/ specifically (rather than the old
           "no slash" trick, which also excluded /uploads/**) so this still
           never touches /_next/static/media/*, whose filenames are
           content-hashed and which Next already marks immutable.

           A year of hard caching: these filenames are not content-hashed, so
           replacing a file in place won't show up for existing visitors
           until the cache entry expires — acceptable here since these are
           stable editorial and clinical photographs, not images that get
           swapped in place. */
        source: "/:path((?!_next/).*\\.(?:png|jpe?g|gif|svg|webp|avif|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
