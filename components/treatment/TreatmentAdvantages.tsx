import { TpIcon } from "./TpIcon";
import type { AdvantageItem } from "./types";
import styles from "./TreatmentAdvantages.module.css";

export function TreatmentAdvantages({
  advantages,
  title,
  eyebrow = "Why choose this treatment",
  heading,
}: {
  advantages: AdvantageItem[];
  title: string;
  eyebrow?: string;
  heading?: string;
}) {
  if (advantages.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <div className="container">
        <div className="tp-head tp-center">
          <span className="tp-eyebrow"><TpIcon name="sparkle" size={13} />{eyebrow}</span>
          <h2>{heading || `Advantages of ${title} Treatment`}</h2>
        </div>
        <div className={styles.tpBenefitsGrid}>
          {advantages.map((adv) => (
            <div key={adv.title} className={styles.tpBenefit}>
              <span className={styles.tpBenefitIcon}><TpIcon name={adv.icon || "check"} size={21} /></span>
              <h3>{adv.title}</h3>
              {adv.description && <p>{adv.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
