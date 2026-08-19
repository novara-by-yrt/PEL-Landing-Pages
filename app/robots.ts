import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://perfecteyesltd.com";

/**
 * Built per request, matching the sitemap.
 *
 * Nothing here reads content, so today this produces the same bytes it did
 * when prerendered. It is dynamic so that the two files that tell a crawler
 * how to crawl the site behave the same way, and so that anything added here
 * later - a rule that depends on the environment, or on a flag rather than on
 * a rebuild - takes effect without a deploy.
 */
export const dynamic = "force-dynamic";

/**
 * robots.txt
 *
 * Two things here are deliberate and easy to get wrong.
 *
 * 1. `/_next/` is NOT disallowed. It used to be, and that is the single most
 *    damaging line a Next.js robots.txt can carry: every stylesheet, script
 *    and optimised image the site serves lives under it, and Google renders a
 *    page before judging it. Blocking the directory leaves Googlebot
 *    rendering an unstyled skeleton and reporting mobile-usability failures on
 *    a site that is perfectly responsive. Google's own guidance is explicit
 *    that CSS and JS must stay crawlable. `/_next/` holds no content worth
 *    hiding — the pages themselves are the content, and they are all allowed.
 *
 * 2. The AI crawlers are listed explicitly. A wildcard `Allow: /` already
 *    permits them, but naming them is what makes the decision reviewable:
 *    the search rules are the ones that put the clinic in ChatGPT, Claude and
 *    Perplexity answers, and they are separated from the training-data
 *    crawlers so either can be revoked without touching the other.
 */
export default function robots(): MetadataRoute.Robots {
  // Endpoints with nothing to index: the contact form's POST handler and the
  // admin path the WordPress redirects still catch.
  const disallow = ["/api/", "/admin/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },

      /* AI search crawlers — these fetch a page to answer a live question and
         cite it. Blocking any of them removes the clinic from that assistant's
         answers entirely. */
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-SearchBot", allow: "/", disallow },
      { userAgent: "Claude-User", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Perplexity-User", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },

      /* Google-Extended governs Gemini and AI Overviews grounding. It is not
         a crawler of its own - Googlebot does the fetching - so leaving it
         allowed costs no crawl budget and is what keeps the clinic eligible
         to be cited in AI Overviews. */
      { userAgent: "Google-Extended", allow: "/", disallow },

      /* Bulk training-corpus scrapers. They return no traffic and no citation,
         so they are declined - separately from the search crawlers above, and
         reversible on the client's say-so. */
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "meta-externalagent", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
