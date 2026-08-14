import { TpIcon, glanceIconKey } from "./TpIcon";
import type { GlanceItem } from "./types";
import styles from "./TreatmentFactBar.module.css";

/**
 * "<Treatment> at a Glance" — the spec panel every treatment page opens with.
 * Rendered once from app/[...slug], so this file is the only place its design
 * lives.
 *
 * A definition list rather than nested spans: every row here is a term and its
 * value, which is what a <dl> is for, and it gives the pairs a relationship a
 * screen reader can follow.
 */
export function TreatmentFactBar({ glance, title }: { glance: GlanceItem[]; title: string }) {
  if (glance.length === 0) return null;

  return (
    <section className={styles.tpFactbar} aria-labelledby="glance-title">
      <div className="container">
        <div className={styles.tpFactbarHead}>
          <span className="tp-eyebrow">
            <TpIcon name="clock" size={13} />
            Treatment overview
          </span>
          <h2 id="glance-title">{title} at a Glance</h2>
          <span className={styles.tpFactbarRule} aria-hidden="true" />
        </div>

        {/* One panel holding every fact, rather than a card each. The values
            range from "Local" to a full sentence, and separate cards put that
            imbalance on show — each one drawing its own border around however
            much text it happened to get. Inside a shared panel the rows simply
            share a row height and the eye reads down the labels instead. */}
        <div className={styles.tpFactbarPanel}>
          <dl className={styles.tpFactbarGrid}>
            {glance.map((item) => (
              <div key={item.label} className={styles.tpFact}>
                <span className={styles.tpFactIcon} aria-hidden="true">
                  <TpIcon name={glanceIconKey(item.label)} size={19} />
                </span>
                <div className={styles.tpFactBody}>
                  <dt className={styles.tpFactLabel}>{item.label}</dt>
                  <dd className={styles.tpFactValue}>{item.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
