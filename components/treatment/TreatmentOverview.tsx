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
    <section className="tp-section">
      <div className={`container ${styles.tpOverviewGrid}${hasImage ? "" : ` ${styles.noImage}`}`}>
        <div>
          <span className="tp-eyebrow"><TpIcon name="clipboard" size={13} />{eyebrow}</span>
          <h2 style={{ fontFamily: "var(--tp-display)", fontWeight: 600, fontSize: "clamp(1.6rem, 3.2vw, 2.35rem)", lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--tp-ink)", margin: "14px 0 0" }}>
            {heading}
          </h2>
          <div className={styles.tpOverviewText}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {hasImage && (
          <div className={styles.tpOverviewFrame}>
            {imageBadge && <span className={styles.tpOverviewBadge}>{imageBadge}</span>}
            <Image src={image!} alt={heading} fill sizes="(max-width: 860px) 100vw, 45vw" loading="lazy" />
          </div>
        )}
      </div>
    </section>
  );
}
