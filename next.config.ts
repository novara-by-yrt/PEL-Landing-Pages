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
    minimumCacheTTL: 60 * 60 * 24 * 31,
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

      // Publications the previous site served at the site root. Their content
      // lives in content/posts, which is served under /blog, so point the old
      // root URLs at the canonical blog URL.
      {
        source: "/nylon-hang-sutures-repair-secondary-ptosis-overcorrected-dysthyroid-upper-eyelid-retraction",
        destination:
          "/blog/nylon-hang-back-sutures-in-the-repair-of-secondary-ptosis-following-overcorrected-dysthyroid-upper-eyelid-retraction",
        permanent: true,
      },
      {
        source: "/stability-of-eyelid-height-after-graded-anterior-approach-lid-lowering-for-dysthyroid-upper-lid-retraction",
        destination:
          "/blog/stability-of-eyelid-height-after-graded-anterior-approach-lid-lowering-for-dysthyroid-upper-lid-retraction",
        permanent: true,
      },
      {
        source: "/two-new-cases-of-metastatic-basal-cell-carcinoma-from-the-eyelids",
        destination: "/blog/two-new-cases-of-metastatic-basal-cell-carcinoma-from-the-eyelids",
        permanent: true,
      },

      // The WordPress export wrote this post's filename with two U+2010
      // hyphens already percent-encoded, so the slug the sitemap advertised
      // was "…ultrasound%e2%80%90imaging…". The request decodes that back to
      // the real character, no file matches, and the URL 404'd — a sitemap
      // entry pointing at a dead page. The file is renamed to plain hyphens;
      // this keeps the old form resolving for anything already linking to it.
      {
        source:
          "/blog/periorbital-venous-stasis-may-be-involved-with-filler-induced-malar-edema-a-duplex-ultrasound%e2%80%90imaging%e2%80%90based-case-series",
        destination:
          "/blog/periorbital-venous-stasis-may-be-involved-with-filler-induced-malar-edema-a-duplex-ultrasound-imaging-based-case-series",
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
      // googletagmanager.com serves gtag.js — the GA4 tag in
      // components/analytics/GoogleAnalytics. It only ever loads once the
      // visitor has accepted cookies, but the policy has to permit the origin
      // for that load to be possible at all.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      // GA still falls back to a tracking pixel on browsers that block
      // fetch/beacon, hence the analytics origins in img-src as well.
      "img-src 'self' data: blob: https://fast.wistia.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
      "media-src 'self' https://embed-ssl.wistia.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
      "frame-src https://www.youtube.com",
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
        /* Files served straight out of public/ — the logo, award badges,
           before/after photographs, the icons. Next only manages caching for
           what it generates (/_next/*), so these went out as
           `Cache-Control: public, max-age=0`: a conditional request on every
           asset, on every page, on every repeat visit. That is the single
           largest avoidable cost for a returning mobile visitor.

           The pattern deliberately excludes anything containing a slash, so
           it matches /Award1.jpg but never /_next/static/media/*, whose
           filenames are content-hashed and which Next already marks immutable.

           A day of hard caching rather than `immutable`, because these
           filenames are not content-hashed — if someone replaces an image in
           place, the change is live within a day, and stale-while-revalidate
           means the month after that is still served instantly while the
           refresh happens in the background. */
        source: "/:file([^/]+\\.(?:png|jpe?g|gif|svg|webp|avif|ico))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
