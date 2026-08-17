import type { GlanceItem } from "./types";
import styles from "./TreatmentGlance.module.css";

/**
 * The treatment's key facts, as a section of their own.
 *
 * This used to live in the hero's right column, which cost the hero its
 * photograph — the two could not both occupy that space, so the picture only
 * appeared on the handful of treatments carrying no facts. Pulled out and
 * placed under the accreditation strip, both get to exist.
 *
 * No icons. A row of decorative glyphs beside single words like "Duration"
 * and "Day Case" added colour but no meaning, and with nine of them stacked
 * the panel read as busy rather than considered. The facts are a table; they
 * are set as one.
 */
export function TreatmentGlance({
  glance = [],
  title,
}: {
  glance?: GlanceItem[];
  /** Names the section for assistive tech without repeating on screen. */
  title?: string;
}) {
  if (glance.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="glance-heading">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>Treatment overview</span>
          <h2 id="glance-heading" className={styles.title}>
            At a Glance
            {title ? <span className="sr-only">: {title}</span> : null}
          </h2>
          <span className={styles.rule} aria-hidden="true" />
        </div>

        {/* A definition list, so each fact is a term paired with its value
            rather than loose text. The 1px grid gap over a tinted panel draws
            the rules between cells: they stay hairline-crisp at any column
            count, and no cell is ever left as a gap in the table. */}
        <dl className={styles.panel}>
          {glance.map((item) => (
            <div key={item.label} className={styles.item}>
              <dt className={styles.label}>{item.label}</dt>
              <dd className={styles.value}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
