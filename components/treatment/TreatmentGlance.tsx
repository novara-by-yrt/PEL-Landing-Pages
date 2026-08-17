import type { GlanceItem } from "./types";
import styles from "./TreatmentGlance.module.css";

/**
 * The treatment's key facts, as a section of their own.
 *
 * Built to the "Trust & Authority" pattern the design system recommends for a
 * medical landing page: credentials and hard numbers presented plainly, high
 * contrast, no ornament competing with the facts. The recommended palette for
 * that pattern is a medical teal, which is deliberately not used — this
 * section has to belong to the page it sits on, so it takes the site's own
 * indigo and lavender tokens instead.
 *
 * The surface is the dark indigo glass band the journey roadmap and the
 * review cards already use. It is the richest surface on the site, and it
 * also does structural work here: the section sits between the accreditation
 * strip and the advantages grid, both pale, so a dark band gives the page a
 * rhythm instead of three light sections in a row.
 *
 * No icons. A glyph beside single words like "Duration" and "Day Case" added
 * colour but no meaning, and nine of them stacked read as busy.
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
      <span className={styles.glow} aria-hidden="true" />

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
            rather than loose text.

            The entrance is CSS-only (see the module's animation-timeline
            block) rather than the shared Reveal component. Reveal starts its
            wrapper at opacity 0 and needs JavaScript to clear it — fine for a
            decorative band, but it would leave a visitor without JS staring
            at an empty panel where the treatment's clinical facts should be.
            A scroll-driven CSS animation degrades the right way: browsers
            that do not support it simply show the cards. */}
        <dl className={styles.grid}>
          {glance.map((item) => (
            <div key={item.label} className={styles.card}>
              <dt className={styles.label}>{item.label}</dt>
              <dd className={styles.value}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
