import Image from "next/image";
import { TpIcon } from "./TpIcon";
import styles from "./TreatmentOverview.module.css";

export function TreatmentOverview({
  eyebrow = "Overview",
  heading,
  paragraphs,
  image,
  imageBadge,
}: {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  imageBadge?: string;
}) {
  if (paragraphs.length === 0) return null;

  const hasImage = Boolean(image);

  return (
    <section className={`tp-section ${styles.tpOverview}`}>
      <span className={styles.tpOverviewGlow} aria-hidden="true" />
      <div className={`container ${styles.tpOverviewGrid}${hasImage ? "" : ` ${styles.noImage}`}`}>
        <div>
          <span className="tp-eyebrow">
            <TpIcon name="clipboard" size={13} />
            {eyebrow}
          </span>
          <h2 className={styles.tpOverviewHeading}>{heading}</h2>
          <span className={styles.tpOverviewRule} aria-hidden="true" />
          <div className={styles.tpOverviewText}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {hasImage && (
          <figure className={styles.tpOverviewFrame}>
            {imageBadge && <span className={styles.tpOverviewBadge}>{imageBadge}</span>}
            <Image
              src={image!}
              alt={heading}
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
              loading="lazy"
              className={styles.tpOverviewImg}
            />
          </figure>
        )}
      </div>
    </section>
  );
}
