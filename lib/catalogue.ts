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
 * Treatment pages withheld from the index because they are not finished.
 *
 * Separate from SUPERSEDED_BY_SIBLING above: nothing is wrong with these
 * pages' place in the site, they are simply not ready to be sent visitors.
 * The page stays live, indexed and in the sitemap - this only stops the
 * catalogue advertising it, alongside the matching removals from the header
 * menu, the home page carousel and the pages that linked to it. Delete the
 * entry to put the card back.
 */
const NOT_READY = new Set(["non-surgical-ultraclear-laser-treatment-uk"]);

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

  /* Two pairs where both pages want the same picture and neither offers a
     second one, so the de-duplication pass below has nothing to fall back to.
     Each override is a real image already used elsewhere in the content and
     chosen to suit the page it lands on:

       - the exosomes pair splits skin from hair, so the plain "Autologous
         Exosomes" page takes the skin photograph and the "Skin & Hair
         Rejuvenation" page keeps the hair one;
       - the polynucleotide pair splits by subject, so the dark-circles page
         takes a dark-circles photograph. */
  "autologous-exosomes": "/uploads/2024/01/skin-treatment-01.jpg",
  "dark-circles-and-polynucleotides-or-mesotherapy": "/uploads/2025/05/Dark-Circle-1.png",

  /* Two cards whose page offers a result but would not otherwise reach it.

     The festoons comparison page led with a portrait of Dr Shah-Desai beside
     her awards - a picture of the surgeon, not the treatment. Its gallery
     holds three results; the first is already claimed by the sibling festoons
     card and the second is a four-panel collage whose captions are unreadable
     at card size, so this takes the third, a plain two-panel comparison.

     Thyroid lid lowering led with a Graves' ophthalmopathy schematic. Its one
     result is the hero, and its filename says nothing about being a before
     and after, so no ordering rule would find it. */
  "festoons-and-malar-bags-treatment-uk": "/uploads/2021/09/Festoons-3.jpg",
  "surgical-thyroid-lid-lowering-surgery": "/uploads/2013/08/case-study-thyroid-eye-disease.jpg",
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
/**
 * Video screengrabs, which are never a card's picture.
 *
 * A little over twenty treatments carry a still lifted from their explainer
 * video in the first overview panel, and fourteen of those stills are the
 * same shot of the surgeon talking to camera in front of the same shelf. As
 * a card image that is neither the treatment nor distinguishable from its
 * neighbours, so these are skipped and the card takes the next real
 * photograph the page offers, or its hero.
 */
function isVideoStill(src: string): boolean {
  return /video/i.test(src);
}

/**
 * The before/after results a page publishes for itself.
 *
 * Every treatment page's `gallery` block is its before/after gallery - each
 * one's galleryHeading says so - which makes membership a better test than
 * the filename. Plenty of genuine result photos are named things like
 * poly.jpg or 3-2-1.png and would never be spotted by pattern-matching a path.
 *
 * These come first in a card's candidate list: a result is what a visitor
 * scanning the index is actually trying to see.
 */
function galleryImages(frontmatter: { gallery?: { image?: string }[] }): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of frontmatter.gallery || []) {
    if (item.image && !seen.has(item.image) && !isVideoStill(item.image)) {
      seen.add(item.image);
      out.push(item.image);
    }
  }
  return out;
}

function pageImages(frontmatter: { overviewPanels?: { image?: string }[] }): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const panel of frontmatter.overviewPanels || []) {
    if (panel.image && !seen.has(panel.image) && !isVideoStill(panel.image)) {
      seen.add(panel.image);
      out.push(panel.image);
    }
  }
  return out;
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
    .filter(
      (page) =>
        treatmentMeta[page.slug] &&
        !SUPERSEDED_BY_SIBLING.has(page.slug) &&
        !NOT_READY.has(page.slug),
    )
    .map((page) => {
      const meta = treatmentMeta[page.slug];
      const href = `/${TREATMENT_PATHS[page.slug] ?? page.slug}`;
      return { page, meta, href };
    })
    .filter(({ page, href }) => isIndexable(page.frontmatter, href))
    .map(
      ({ page, meta, href }): CatalogueCard & { type: string; candidates: string[] } => ({
        slug: page.slug,
        title: (page.frontmatter.title || meta.h1 || "").trim(),
        blurb: summarise(meta.subtitle || page.frontmatter.excerpt),
        href,
        /* Filled in by the de-duplication pass below. */
        image: "",
        /* Every image this treatment can legitimately claim, best first: the
           pictures on its own page, then the hero assigned in treatment-meta
           as a backstop for the twelve treatments whose page has none. */
        candidates: CARD_IMAGE_OVERRIDES[page.slug]
          ? [CARD_IMAGE_OVERRIDES[page.slug]]
          : [
              ...galleryImages(page.frontmatter),
              ...pageImages(page.frontmatter),
              meta.heroImage,
            ].filter((src): src is string => Boolean(src) && !isVideoStill(src)),
        type: meta.type,
      }),
    )
    .sort((a, b) => a.title.localeCompare(b.title, "en-GB"));

  /* No two cards may show the same photograph.
     Several treatments are covered by a pair of pages - two festoons pages,
     two revision pages, two Morpheus8 pages - and a pair naturally reaches for
     the same picture, which left the grid looking like a mistake.

     Walked in display order, so the first card to want an image keeps it and
     the later one moves to the next picture on its own page. The walk is over
     the sorted list and the candidate lists come from the content, so the
     assignment is deterministic: the same content always produces the same
     grid. */
  const claimed = new Set<string>();
  for (const card of cards) {
    card.image = card.candidates.find((src) => !claimed.has(src)) || card.candidates[0] || "";
    if (card.image) claimed.add(card.image);
  }

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
