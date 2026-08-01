import Image from "next/image";
import { TpIcon } from "./TpIcon";
import type { SimilarTreatmentItem } from "./types";
import styles from "./TreatmentSimilar.module.css";

export function TreatmentSimilar({
  items,
  eyebrow = "You may also consider",
  heading = "Similar Treatments",
}: {
  items: SimilarTreatmentItem[];
  eyebrow?: string;
  heading?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className="tp-section">
      <div className="container">
        <div className="tp-head">
          <span className="tp-eyebrow"><TpIcon name="compass" size={13} />{eyebrow}</span>
          <h2>{heading}</h2>
        </div>
        <div className={styles.tpSimilarGrid}>
          {items.map((t) => {
            const card = (
              <>
                <div className={styles.tpSimilarImg}>
                  <Image src={t.image} alt={t.title} fill sizes="(max-width: 700px) 50vw, 22vw" loading="lazy" />
                </div>
                <div className={styles.tpSimilarBody}>
                  <div className={styles.tpSimilarTitle}>{t.title}</div>
                  {t.description && <div className={styles.tpSimilarDesc}>{t.description}</div>}
                </div>
              </>
            );
            return t.href ? (
              <a key={t.title} href={t.href} className={styles.tpSimilarCard}>{card}</a>
            ) : (
              <div key={t.title} className={styles.tpSimilarCard}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
