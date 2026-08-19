import { TpIcon } from "@/components/treatment/TpIcon";
import type { ProsConsData } from "@/lib/mdx";
import styles from "./ProsCons.module.css";

/**
 * Renders a post's "Pros and Cons" section as a proper two-column
 * comparison instead of raw migrated HTML.
 *
 * The source content for these sections came in as a title-only bullet
 * point followed by a separate, disconnected paragraph for every single
 * item (e.g. `<ul><li>Quick Recovery</li></ul><span>Most patients...</span>`,
 * repeated once per point) - so it rendered as a wall of one-word bullets
 * with paragraphs orphaned beneath them. This pairs each title with its own
 * description again and gives pros/cons their own visual identity (check vs
 * cross, sage vs clay) rather than looking like an ordinary bullet list.
 */
export function ProsCons({ data }: { data: ProsConsData }) {
  if (data.pros.length === 0 && data.cons.length === 0) return null;

  return (
    <div className={styles.prosCons}>
      {data.pros.length > 0 && (
        <div className={styles.column}>
          <h3 className={styles.heading}>
            <span className={`${styles.icon} ${styles.iconPro}`}>
              <TpIcon name="check" size={15} />
            </span>
            {data.prosHeading}
          </h3>
          <ul className={styles.list}>
            {data.pros.map((item) => (
              <li key={item.title} className={styles.item}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.cons.length > 0 && (
        <div className={`${styles.column} ${styles.consColumn}`}>
          <h3 className={styles.heading}>
            <span className={`${styles.icon} ${styles.iconCon}`}>
              <TpIcon name="close" size={13} />
            </span>
            {data.consHeading}
          </h3>
          <ul className={styles.list}>
            {data.cons.map((item) => (
              <li key={item.title} className={styles.item}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
