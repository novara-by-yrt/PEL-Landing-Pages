import Image from "next/image";
import Link from "next/link";
import { TpIcon } from "./TpIcon";
import { treatmentHref } from "@/lib/treatment-urls";
import type { SimilarTreatmentItem } from "./types";
import styles from "./TreatmentSimilar.module.css";

/**
 * The similar-treatment entries in treatment-meta.json carry a display name
 * and an image but no link, so every card was a dead end. Only nine distinct
 * names are used across all the treatments, and each one names a real page —
 * this maps them, so the cards navigate.
 *
 * Keys are lower-cased titles. Values are either a treatment slug (resolved
 * through treatmentHref, so the canonical nested path stays in one place) or,
 * for the one entry that is not a treatment page, a literal path.
 */
const SIMILAR_TARGETS: Record<string, { slug?: string; href?: string }> = {
  "chalazion removal": { slug: "surgical-eyelid-surgery-chalazion-removal-uk" },
  "double eyelid surgery": { slug: "double-eyelid-surgery" },
  "endolift®": { slug: "endolift" },
  "eye bag surgery": { slug: "eye-bag-removal-blepharoplasty-uk" },
  "eyelid lumps": { slug: "eyelid-lump-bump-removal" },
  "facial contouring with dermal fillers": { href: "/non-surgical/facial-contouring-uk" },
  "festoons and malar bags": { slug: "surgical-festoons-malar-bags-treatment-uk" },
  "ptosis surgery": { slug: "ptosis-surgery" },
  "upper lid blepharoplasty": { slug: "upper-eyelid-lift-surgery-blepharoplasty" },
};

function resolveTarget(item: SimilarTreatmentItem): { href: string; slug?: string } | null {
  if (item.href) return { href: item.href };
  const target = SIMILAR_TARGETS[item.title.trim().toLowerCase()];
  if (!target) return null;
  if (target.href) return { href: target.href };
  if (target.slug) return { href: treatmentHref(target.slug), slug: target.slug };
  return null;
}

export function TreatmentSimilar({
  items,
  currentSlug,
  eyebrow = "You may also consider",
  heading = "Similar Treatments",
}: {
  items: SimilarTreatmentItem[];
  /** The treatment being viewed, so it is not offered as an alternative to itself. */
  currentSlug?: string;
  eyebrow?: string;
  heading?: string;
}) {
  const cards = items
    .map((item) => ({ item, target: resolveTarget(item) }))
    .filter(({ target }) => !(currentSlug && target?.slug === currentSlug));

  if (cards.length === 0) return null;

  return (
    <section className={`tp-section ${styles.tpSimilar}`}>
      <span className={styles.tpSimilarGlow} aria-hidden="true" />
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow">
            <TpIcon name="compass" size={13} />
            {eyebrow}
          </span>
          <h2>{heading}</h2>
          <span className={styles.tpSimilarRule} aria-hidden="true" />
        </div>

        <ul className={styles.tpSimilarGrid}>
          {cards.map(({ item, target }) => {
            const body = (
              <>
                <span className={styles.tpSimilarImg}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1000px) 24vw, (min-width: 560px) 45vw, 90vw"
                    loading="lazy"
                    className={styles.tpSimilarPhoto}
                  />
                  <span className={styles.tpSimilarScrim} aria-hidden="true" />
                </span>
                <span className={styles.tpSimilarBody}>
                  <span className={styles.tpSimilarTitle}>{item.title}</span>
                  {item.description && (
                    <span className={styles.tpSimilarDesc}>{item.description}</span>
                  )}
                  {target && (
                    <span className={styles.tpSimilarExplore}>
                      Explore
                      <span className={styles.tpSimilarArrow} aria-hidden="true">
                        <TpIcon name="arrow" size={15} />
                      </span>
                    </span>
                  )}
                </span>
              </>
            );

            return (
              <li key={item.title}>
                {target ? (
                  <Link href={target.href} className={styles.tpSimilarCard}>
                    {body}
                  </Link>
                ) : (
                  <div className={styles.tpSimilarCard}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
