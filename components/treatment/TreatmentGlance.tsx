import type { GlanceItem } from "./types";
import styles from "./TreatmentGlance.module.css";

/**
 * The treatment's key facts.
 *
 * One panel holding the treatment's name, the heading, and the facts as a
 * ledger of label-and-value cells divided by hairlines. The dividers are 1px
 * grid gaps showing the panel's rule colour through, so they stay correct at
 * one, two or three columns without a rule ever being drawn per cell or
 * suppressed on the last one.
 *
 * No icons. A glyph beside single words like "Duration" and "Day Case" added
 * colour but no meaning.
 */
export function TreatmentGlance({
  glance = [],
  title,
}: {
  glance?: GlanceItem[];
  /** Shown above the heading, as the reference layout does. */
  title?: string;
}) {
  if (glance.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="glance-heading">
      <span className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.panel}>
          <div className={styles.head}>
            {title ? <span className={styles.eyebrow}>{title}</span> : null}
            <h2 id="glance-heading" className={styles.title}>
              At a Glance
            </h2>
            <span className={styles.rule} aria-hidden="true" />
          </div>

          {/* A definition list, so each fact is a term paired with its value
              rather than loose text. */}
          <dl className={styles.grid}>
            {glance.map((item) => (
              <div
                key={item.label}
                /* A fact that is a sentence rather than a specification takes
                   the whole row. Left in one cell of three it would set the
                   height of the row and strand the short facts beside it. The
                   threshold is 40 characters: measured against the rendered
                   panel, that is the point at which a value stops fitting a
                   single cell on two lines at the narrowest column width. */
                className={`${styles.item}${
                  item.value.length > 40 ? ` ${styles.itemWide}` : ""
                }`}
              >
                <dt className={styles.label}>{item.label}</dt>
                <dd className={styles.value}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
