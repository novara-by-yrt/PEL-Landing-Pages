import type { GlanceItem } from "./types";
import styles from "./TreatmentGlance.module.css";

/**
 * The treatment's key facts.
 *
 * One panel holding the treatment's name, the heading, and the facts as plain
 * label-and-value pairs. The facts were previously a card each, which gave
 * every fact its own border and shadow and left the grid ragged: cards sized
 * to their own text, so a four-line value stood beside a one-line value and
 * the last row held a single card adrift. A list inside one container has one
 * edge instead of nine and a single spacing rhythm, which is what makes the
 * desktop layout line up.
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
          </div>

          {/* A definition list, so each fact is a term paired with its value
              rather than loose text. */}
          <dl className={styles.grid}>
            {glance.map((item) => (
              <div
                key={item.label}
                /* A value long enough to wrap past two lines takes two of the
                   three columns. Left in one, it made its whole row as tall as
                   itself and the short facts beside it ended well short of the
                   panel's foot: bottom padding measured 106px against 53px on
                   the other three sides. Threshold measured against the
                   rendered panel, not guessed. */
                className={`${styles.item}${
                  item.value.length > 46 ? ` ${styles.itemWide}` : ""
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
