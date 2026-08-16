import Link from "next/link";
import Image from "next/image";
import { TpIcon, glanceIconKey } from "./TpIcon";
import type { BreadcrumbItem, GlanceItem } from "./types";
import styles from "./TreatmentHero.module.css";

export function TreatmentHero({
  breadcrumbItems,
  siteUrl,
  h1,
  subtitle,
  glance = [],
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
  /** The at-a-glance facts, which now fill the hero's right column. */
  glance?: GlanceItem[];
  heroImage?: string;
  heroImageAlt: string;
  heroBadge?: string;
  heroBg?: string;
  /** Overrides the subtle default (0.16) for a real content photo, rather than the generic abstract-texture background, which needs more visual weight to register. */
  heroBgOpacity?: number;
}) {
  /* Six treatments carry no glance data at all. Rather than leave half the
     hero empty on those, they keep the illustration and surgeon card the
     column used to hold — every one of them has a hero image. */
  const hasGlance = glance.length > 0;
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
          {hasGlance ? (
            <div className={styles.tpGlance}>
              <div className={styles.tpGlanceHead}>
                <span className={styles.tpGlanceEyebrow}>
                  <TpIcon name="clock" size={13} />
                  Treatment overview
                </span>
                {/* Just "At a Glance": the treatment name is already the h1
                    directly to the left of this panel, so repeating it here said
                    the same thing twice in one viewport. */}
                <h2 className={styles.tpGlanceTitle}>At a Glance</h2>
              </div>

              {/* A definition list: every row is a term and its value, and the
                  pairing is then something a screen reader can follow. */}
              <dl className={styles.tpGlanceGrid}>
                {glance.map((item) => (
                  <div key={item.label} className={styles.tpGlanceItem}>
                    <span className={styles.tpGlanceIcon} aria-hidden="true">
                      <TpIcon name={glanceIconKey(item.label)} size={17} />
                    </span>
                    <div className={styles.tpGlanceBody}>
                      <dt className={styles.tpGlanceLabel}>{item.label}</dt>
                      <dd className={styles.tpGlanceValue}>{item.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <>
              <div className={styles.tpHeroFrame}>
                {heroBadge && <span className={styles.tpHeroBadge}>{heroBadge}</span>}
                {heroImage && (
                  /* Above the fold — LCP element on these pages. */
                  <Image src={heroImage} alt={heroImageAlt} fill sizes="(max-width: 980px) 100vw, 42vw" priority />
                )}
              </div>
              <div className={styles.tpDoctorCard}>
                <span className={styles.tpDot}><TpIcon name="sparkle" size={19} /></span>
                <div>
                  <h5>Dr. Sabrina Shah—Desai</h5>
                  <small>MS, FRCS (Ed) Ophth.</small>
                  <p>Recognised as a top practitioner for eyes for eight consecutive years, 2018–2026</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
