import type { PostFrontmatter } from "./mdx";

// The hero's visual image is deliberately separate from featuredImage (used
// for OG/meta only): some pages have a real photo on the live site but no
// hero image at all, and forcing featuredImage into the hero misrepresents
// that. Set `heroImage` explicitly (including `heroImage: null` to force no
// hero photo) when it needs to differ from the default of "reuse featuredImage".
export function resolveHeroImage(frontmatter: PostFrontmatter): string | undefined {
  if (frontmatter.heroImage !== undefined) return frontmatter.heroImage || undefined;
  return frontmatter.featuredImage && frontmatter.featuredImage !== "NONE"
    ? frontmatter.featuredImage
    : undefined;
}

/**
 * Whether an image path is one of the before/after result photographs.
 *
 * The two naming conventions in public/ are the `ba-*` / `*-ba-*` slugs from
 * the 2026 upload batch and the older migrated files that spell it out
 * ("...-before-after1.jpg", "Teoxane-BabyGlow-BA.jpg"). This only reads the
 * path, so it is a labelling aid, not a guarantee about the pixels.
 */
export function isBeforeAfterImage(src: string | undefined): boolean {
  if (!src) return false;
  return /(^|\/)ba-|-ba[-.]|-ba$|before-?_?after|before-and-after/i.test(src);
}

export const ACCREDITATION_LOGOS = [
  { src: "/uploads/2024/09/11.png", alt: "The Royal College of Ophthalmologists Logo" },
  { src: "/uploads/2024/09/22.png", alt: "The Royal College of Surgeons of Edinburgh Logo" },
  { src: "/uploads/2024/09/31.png", alt: "BAPRAS Logo" },
  { src: "/uploads/2024/09/41.png", alt: "General Medical Council" },
  { src: "/uploads/2024/09/51.png", alt: "APRASSA Logo" },
  { src: "/uploads/2024/09/61.png", alt: "South African Society for SASDS Dermatologic Surgery Logo" },
  { src: "/uploads/2024/09/71.png", alt: "BOPSS British Oculoplastic Surgery Society" },
];
