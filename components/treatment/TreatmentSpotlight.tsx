import Image from "next/image";
import Link from "next/link";
import { TpIcon } from "./TpIcon";
import type { SimilarTreatmentItem } from "./types";
import styles from "./TreatmentSpotlight.module.css";

interface SpotlightItem extends SimilarTreatmentItem {
  priceFrom?: string;
  facts?: { label: string; value: string }[];
}

export function TreatmentSpotlight({
  items,
  eyebrow = "Treatment options",
  heading = "Recommended treatment",
}: {
  items: SpotlightItem[];
  eyebrow?: string;
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={`tp-section tp-fog ${styles.tpSpotlightSection}`}>
      <span className={styles.tpSpotlightGlow} aria-hidden="true" />
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow">
            <TpIcon name="compass" size={13} />
            {eyebrow}
          </span>
          <h2>{heading}</h2>
          <span className={styles.tpSpotlightRule} aria-hidden="true" />
        </div>

        <div className={styles.tpSpotlightList}>
          {items.map((t) => (
            <div key={t.title} className={styles.tpSpotlight}>
              <div className={styles.tpSpotlightMedia}>
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  sizes="(max-width: 780px) 100vw, 45vw"
                  loading="lazy"
                  className={styles.tpSpotlightImg}
                />
              </div>
              <div className={styles.tpSpotlightBody}>
                <span className={styles.tpSpotlightTag}>
                  <TpIcon name="shield" size={13} />
                  Recommended Procedure
                </span>
                <h3>{t.title}</h3>
                {t.description && <p>{t.description}</p>}

                {t.facts && t.facts.length > 0 && (
                  <div className={styles.tpSpotlightFacts}>
                    {t.facts.map((f) => (
                      <div key={f.label}>
                        <div className={styles.tpSpotlightFactLabel}>{f.label}</div>
                        <div className={styles.tpSpotlightFactValue}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.tpSpotlightFooter}>
                  {t.priceFrom && (
                    <div className={styles.tpSpotlightPrice}>
                      <span className={styles.tpSpotlightPriceLabel}>Guide price</span>
                      <span className={styles.tpSpotlightPriceValue}>{t.priceFrom}</span>
                    </div>
                  )}
                  {t.href && (
                    <Link href={t.href} className="tp-btn tp-btn-primary">
                      View Treatment Details
                      <span className="tp-btn-arrow" aria-hidden="true">
                        <TpIcon name="arrow" size={16} />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
