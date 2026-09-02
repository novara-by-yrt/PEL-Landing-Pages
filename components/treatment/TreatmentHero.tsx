import Link from "next/link";
import Image from "next/image";
import SafeImage from "@/components/shared/SafeImage";
import styles from "./TreatmentHero.module.css";

export function TreatmentHero({
  h1,
  subtitle,
  price,
  heroImage,
  heroImageAlt,
  heroBadge,
  heroBg,
  heroBgOpacity,
}: {
  h1: string;
  subtitle?: string;
  /** Headline figure, e.g. "From £1,800". Omitted where a treatment quotes
   *  no figure and is priced at consultation instead. */
  price?: string | null;
  heroImage?: string;
  heroImageAlt: string;
  /** Caption chip over the hero photo. Omitted when there is nothing true to say about the image — it used to default to "Before & After", which mislabelled every hero that was a stock treatment photo. */
  heroBadge?: string;
  heroBg?: string;
  /** Overrides the subtle default (0.16) for a real content photo, rather than the generic abstract-texture background, which needs more visual weight to register. */
  heroBgOpacity?: number;
}) {
  /* The hero's right column is the treatment's photograph, on every
     treatment. It used to be given over to the At a Glance panel wherever a
     treatment had facts, which meant the picture appeared on only a handful
     of pages; the facts now have a section of their own below the
     accreditation strip, so the two no longer compete for the space. */
  return (
    <section className={styles.tpHero}>

      {heroBg && (
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          className={styles.tpHeroBg}
          aria-hidden="true"
          style={heroBgOpacity !== undefined ? { opacity: heroBgOpacity } : undefined}
        />
      )}
      <div className={`${styles.tpHeroGlow} ${styles.tpHeroGlowA}`} />
      <div className={`${styles.tpHeroGlow} ${styles.tpHeroGlowB}`} />
      <div className={`container ${styles.tpHeroInner}`}>
        <div>
          <h1 className={styles.tpH1}>{h1}</h1>

          <span className={styles.tpHeroRule} aria-hidden="true" />

          {subtitle && <p className={styles.tpSub}>{subtitle}</p>}

          {/* The figure sits between the description and the buttons: it is
              the question a visitor asks straight after "what is this?", and
              answering it before the CTA rather than a full page below it is
              what stops the scroll being the price of finding out. */}
          {price && (
            <p className={styles.tpHeroPrice}>
              <span className={styles.tpHeroPriceLabel}>Price</span>
              <span className={styles.tpHeroPriceValue}>{price}</span>
            </p>
          )}

          <div className={styles.tpHeroActions}>
            <Link href="/self-test-survey" className="tp-btn tp-btn-primary">
              Take the Free Self-Test
            </Link>
            <Link href="/contact" className="tp-btn tp-btn-secondary">Book Consultation</Link>
          </div>
        </div>

        <div className={styles.tpHeroRight}>
          <div className={styles.tpHeroFrame}>
            {heroBadge && <span className={styles.tpHeroBadge}>{heroBadge}</span>}
            {heroImage && (
              /* Above the fold — LCP element on these pages. SafeImage rather
                 than a bare next/image because most of these are /uploads
                 paths on the WordPress origin; a miss should show the brand
                 placeholder, not alt text and a broken glyph at the top of
                 the page. */
              <SafeImage
                src={heroImage}
                alt={heroImageAlt}
                sizes="(max-width: 980px) 100vw, 42vw"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
