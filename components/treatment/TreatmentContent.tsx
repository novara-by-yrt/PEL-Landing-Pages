import styles from "./TreatmentContent.module.css";

/**
 * The page's own long-form body, straight from its MDX. Every other section on
 * a treatment page is built from structured data and styled to match; this one
 * was a bare prose column on plain white, so it read as the one unfinished
 * part of the page. It now sits in a paper card on a tinted field, and the
 * headings, lists and emphasis inside it are styled locally rather than
 * inheriting the site-wide `.prose` defaults.
 */
export function TreatmentContent({ content }: { content: string }) {
  /* A few generic pages carry no real body (old WP category-landing stubs) —
     skip the card entirely rather than showing an empty paper rectangle. */
  if (!content.trim()) return null;

  return (
    <section className={styles.tpContent}>
      <span className={styles.tpContentGlow} aria-hidden="true" />
      <div className="container">
        <article className={styles.tpContentCard}>
          <div
            className={styles.tpContentBody}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </section>
  );
}
