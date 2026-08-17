import Link from "next/link";
import Image from "next/image";
import SafeImage from "@/components/shared/SafeImage";
import { TpIcon } from "./TpIcon";
import type { BreadcrumbItem } from "./types";
import styles from "./TreatmentHero.module.css";

export function TreatmentHero({
  breadcrumbItems,
  siteUrl,
  h1,
  subtitle,
  heroImage,
  heroImageAlt,
  heroBadge = "Before & After",
  heroBg,
  heroBgOpacity,
}: {
  breadcrumbItems: BreadcrumbItem[];
  siteUrl: string;
  h1: string;
  subtitle?: string;
  heroImage?: string;
  heroImageAlt: string;
  heroBadge?: string;
  heroBg?: string;
  /** Overrides the subtle default (0.16) for a real content photo, rather than the generic abstract-texture background, which needs more visual weight to register. */
  heroBgOpacity?: number;
}) {
  /* The hero's right column is the treatment's photograph and the surgeon
     card, on every treatment. It used to be given over to the At a Glance
     panel wherever a treatment had facts, which meant the picture appeared on
     only a handful of pages; the facts now have a section of their own below
     the accreditation strip, so the two no longer compete for the space. */
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
          <nav aria-label="Breadcrumb" className={styles.tpBreadcrumb}>
            {breadcrumbItems.map((item, index) => (
              <span key={`${item.url}-${index}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {index > 0 && <span aria-hidden="true">/</span>}
                {index === breadcrumbItems.length - 1 || !item.url ? (
                  <span style={{ color: "var(--tp-slate)" }}>{item.name}</span>
                ) : (
                  <Link href={item.url.replace(siteUrl, "") || "/"}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>

          <h1 className={styles.tpH1}>{h1}</h1>

          <span className={styles.tpHeroRule} aria-hidden="true" />

          {subtitle && <p className={styles.tpSub}>{subtitle}</p>}

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
          <div className={styles.tpDoctorCard}>
            <span className={styles.tpDot}>
              <TpIcon name="sparkle" size={19} />
            </span>
            <div>
              <h5>Dr. Sabrina Shah-Desai</h5>
              <small>MS, FRCS (Ed) Ophth.</small>
              <p>Recognised as a top practitioner for eyes for eight consecutive years, 2018-2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
