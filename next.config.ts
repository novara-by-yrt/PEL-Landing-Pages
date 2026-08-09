import type { NextConfig } from "next";
import treatmentPaths from "./content/treatment-paths.json";

const TREATMENT_PATHS: Record<string, string> = treatmentPaths.paths;

// Origin that backs /uploads/* when a file isn't present in the local
// public/ directory (e.g. in production, where the 2GB uploads folder is
// gitignored and never deployed). Point this at Cloudflare R2 (or any other
// host) later by changing this one value — no other code needs to change.
const UPLOADS_ORIGIN =
  process.env.UPLOADS_ORIGIN || "https://perfecteyesltd.com/wp-content/uploads";

const nextConfig: NextConfig = {
  // Static export support — pre-render all pages at build time
  output: "standalone",

  // Optimise images from the migrated uploads directory
  images: {
    formats: ["image/avif", "image/webp"],
    // No external domains needed — all images are local
    remotePatterns: [],
  },

  // Fall back to the external uploads origin for any /uploads/* path not
  // found locally. Next.js checks the filesystem (public/) before applying
  // these, so local dev still serves from disk when the file exists there.
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${UPLOADS_ORIGIN}/:path*`,
      },
    ];
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

      // Legacy alias: the previous site serves this URL but points its
      // rel="canonical" at the eyelid-surgery path, so mirror that.
      {
        source: "/surgical/droopy-eyelid/ptosis-surgery-uk",
        destination: `/${TREATMENT_PATHS["ptosis-surgery"]}`,
        permanent: true,
      },

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
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://fast.wistia.com",
      "media-src 'self' https://embed-ssl.wistia.com",
      "font-src 'self' data:",
      "connect-src 'self'",
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
    ];
  },
};

export default nextConfig;
