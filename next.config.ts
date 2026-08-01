import type { NextConfig } from "next";

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

      // Legacy WordPress paths that the live site has redirected to
      // droopy-ptosis-eye for years — real production URLs, unlike the flat
      // Next.js-only slugs below, so worth preserving.
      { source: "/surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk", destination: "/condition/droopy-ptosis-eye", permanent: true },
      { source: "/surgical/droopy-eyelid/ptosis-surgery-uk", destination: "/condition/droopy-ptosis-eye", permanent: true },
    ];
  },

  // Compress response
  compress: true,

  // Strict mode for better React error catching
  reactStrictMode: true,
};

export default nextConfig;
