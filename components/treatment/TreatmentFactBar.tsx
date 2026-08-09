import { TpIcon, glanceIconKey } from "./TpIcon";
import type { GlanceItem } from "./types";
import styles from "./TreatmentFactBar.module.css";

export function TreatmentFactBar({ glance, title }: { glance: GlanceItem[]; title: string }) {
  if (glance.length === 0) return null;

  return (
    <section className={styles.tpFactbar}>
      <div className="container">
        <div className={styles.tpFactbarHead}>
          <span className="tp-eyebrow"><TpIcon name="clock" size={13} />Treatment overview</span>
          <h2>{title} at a Glance</h2>
          <span className={styles.tpFactbarRule} aria-hidden="true" />
        </div>
        <div className={styles.tpFactbarGrid}>
          {glance.map((item) => (
            <div key={item.label} className={styles.tpFact}>
              <span className={styles.tpFactIcon}><TpIcon name={glanceIconKey(item.label)} size={20} /></span>
              <span>
                <span className={styles.tpFactLabel}>{item.label}</span>
                <span className={styles.tpFactValue}>{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
