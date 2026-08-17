import treatmentMetaRaw from "@/content/treatment-meta.json";
import { isIndexable } from "@/lib/indexable";
import { getAllPosts } from "@/lib/mdx";
import { TREATMENT_PATHS } from "@/lib/treatment-urls";
import type { TreatmentMeta } from "@/components/treatment/types";

const treatmentMeta = treatmentMetaRaw as unknown as Record<string, TreatmentMeta>;

/**
 * Treatment pages kept off the index because a sibling already covers the
 * same treatment under the same name.
 *
 * The site publishes two live, indexable pages both titled "Ptosis Surgery" —
 * /surgical/droopy-eyelid/ptosis-surgery-uk and
 * /surgical/eyelid-surgery/droppy-eye-ptosis-surgery-uk. Two identical cards
 * pointing at different URLs is a coin toss for the reader, so the index
 * shows the one the main navigation links to. Both pages stay live, indexed
 * and in the sitemap; this only decides what the index lists. The real fix is
 * upstream — one of the two should be merged into the other — at which point
 * this entry can go.
 */
const SUPERSEDED_BY_SIBLING = new Set(["ptosis-surgery-uk"]);

/**
 * Cards that deliberately do not take their page's own image.
 *
 * Blind Eye Removal was set to a close-up of an eye by explicit request; its
 * page still carries the old surgical diagram. Matching the page here would
 * undo that, so the card keeps the photograph and the page is the one that
 * should be brought into line.
 */
const CARD_IMAGE_OVERRIDES: Record<string, string> = {
  "eyeball-removal": "/blepharoplasty-quiz-intro.jpg",
};

export interface CatalogueCard {
  slug: string;
  /** Card heading. */
  title: string;
  /** One line under the heading; may be empty. */
  blurb: string;
  /** Site-relative path to the page. */
  href: string;
  /** Card artwork. Every one of these lives under /uploads. */
  image: string;
}

/**
 * The image a treatment page actually shows for itself.
 *
 * Not the hero: on all but a handful of treatments the hero slot renders the
 * "At a glance" panel instead of a picture, and the only image in the hero
 * band is a decorative backdrop shared by every treatment on the site. The
 * page's own photograph is the one in its first overview panel — the "What is
 * X?" section — so that is what a card for that page should carry.
 *
 * Read from the page rather than copied into a list beside it: a card cannot
 * then drift from the page it points at when the content changes.
 */
function pageImage(frontmatter: { overviewPanels?: { image?: string }[] }): string {
  return frontmatter.overviewPanels?.find((panel) => panel.image)?.image || "";
}

/** Frontmatter prose is HTML-ish and often long; a card needs one clean line. */
function summarise(raw: string | undefined, limit = 132): string {
  if (!raw) return "";
  const text = raw
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trim()}…`;
}

/**
 * Every treatment the site publishes, split the way the clinic talks about
 * them: surgical and non-surgical.
 *
 * Built from the content files rather than a hand-kept list, and filtered
 * through the same isIndexable() rule the sitemap and llms.txt use — so a
 * treatment that is noindexed, or is a legacy alias whose canonical points
 * elsewhere, never appears here either. Adding a treatment page puts it on
 * this index automatically; there is no second list to remember.
 *
 * Card titles come from the frontmatter title, not the page's h1. The h1s are
 * full marketing headlines — one runs to "“Scarless” Ptosis Surgery in London
 * Say goodbye to droopy lids and hello to brighter, more expressive eyes" —
 * which is a headline, not the name of a treatment, and averages 60
 * characters against the frontmatter title's 27. On a card the short name is
 * the readable one.
 */
export function getTreatmentCatalogue(): {
  surgical: CatalogueCard[];
  nonSurgical: CatalogueCard[];
} {
  const cards = getAllPosts("pages")
    .filter((page) => treatmentMeta[page.slug] && !SUPERSEDED_BY_SIBLING.has(page.slug))
    .map((page) => {
      const meta = treatmentMeta[page.slug];
      const href = `/${TREATMENT_PATHS[page.slug] ?? page.slug}`;
      return { page, meta, href };
    })
    .filter(({ page, href }) => isIndexable(page.frontmatter, href))
    .map(
      ({ page, meta, href }): CatalogueCard & { type: string } => ({
        slug: page.slug,
        title: (page.frontmatter.title || meta.h1 || "").trim(),
        blurb: summarise(meta.subtitle || page.frontmatter.excerpt),
        href,
        /* Show what the page shows. Twelve treatments have no image of their
           own, and those keep the hero assigned in treatment-meta. */
        image: CARD_IMAGE_OVERRIDES[page.slug] ?? (pageImage(page.frontmatter) || meta.heroImage || ""),
        type: meta.type,
      }),
    )
    .sort((a, b) => a.title.localeCompare(b.title, "en-GB"));

  return {
    surgical: cards.filter((c) => c.type === "surgical"),
    nonSurgical: cards.filter((c) => c.type !== "surgical"),
  };
}

/**
 * Every eye condition the site publishes, in alphabetical order. Same
 * indexability rule as the treatments above.
 */
export function getConditionCatalogue(): CatalogueCard[] {
  return getAllPosts("condition")
    .map((post) => ({ post, href: `/condition/${post.slug}` }))
    .filter(({ post, href }) => isIndexable(post.frontmatter, href))
    .map(({ post, href }) => ({
      slug: post.slug,
      title: post.frontmatter.title,
      blurb: summarise(post.frontmatter.excerpt),
      href,
      image: post.frontmatter.featuredImage || "",
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "en-GB"));
}
