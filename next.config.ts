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
    ];
  },

  // Compress response
  compress: true,

  // Strict mode for better React error catching
  reactStrictMode: true,
};

export default nextConfig;
