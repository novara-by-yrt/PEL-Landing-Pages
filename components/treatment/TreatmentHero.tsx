import Link from "next/link";
import Image from "next/image";
import { TpIcon } from "./TpIcon";
import type { BreadcrumbItem } from "./types";
import styles from "./TreatmentHero.module.css";

export function TreatmentHero({
  breadcrumbItems,
  siteUrl,
  isSurgical,
  h1,
  subtitle,
  heroImage,
  heroImageAlt,
}: {
  breadcrumbItems: BreadcrumbItem[];
  siteUrl: string;
  isSurgical: boolean;
  h1: string;
  subtitle?: string;
  heroImage?: string;
  heroImageAlt: string;
}) {
  return (
    <section className={styles.tpHero}>

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

          <span className="tp-eyebrow">
            <TpIcon name="eye" size={13} />
            {isSurgical ? "Surgical · Eyes" : "Non-Surgical · Eyes"}
          </span>

          <h1 className={styles.tpH1}>{h1}</h1>

          {subtitle && <p className={styles.tpSub}>{subtitle}</p>}

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/self-test-survey" className="tp-btn tp-btn-primary">
              Take the Free Self-Test <TpIcon name="arrow" size={17} />
            </Link>
            <Link href="/contact" className="tp-btn tp-btn-secondary">Book Consultation</Link>
          </div>
        </div>

        <div className={styles.tpHeroRight}>
          <div className={styles.tpHeroFrame}>
            <span className={styles.tpHeroBadge}>Before &amp; After</span>
            {heroImage && (
              /* Above the fold — LCP element on treatment pages. */
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
        </div>
      </div>
    </section>
  );
}
