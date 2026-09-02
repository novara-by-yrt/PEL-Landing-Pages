import Link from "next/link";
import Image from "next/image";
import { TpIcon } from "./TpIcon";
import styles from "./PageHero.module.css";

export function PageHero({
  eyebrow,
  h1,
  lead,
  heroImage,
  heroImageAlt,
  heroBadge,
  children,
}: {
  eyebrow?: string;
  h1: string;
  lead?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroBadge?: string;
  /** Rendered under the lead — the index pages put their jump nav here. */
  children?: React.ReactNode;
}) {
  const hasImage = Boolean(heroImage);

  return (
    <section className={styles.tpPageHero}>

      <div className={styles.tpPageHeroGlow} />
      <div className={`${styles.tpPageHeroInner}${hasImage ? ` ${styles.hasImage}` : ""}`}>
        <div>
          {eyebrow && (
            <span className="tp-eyebrow">
              <TpIcon name="sparkle" size={13} />
              {eyebrow}
            </span>
          )}

          <h1>{h1}</h1>

          {lead && <p className={styles.tpPageLead}>{lead}</p>}

          {children}

          {hasImage && (
            <div className={styles.tpPageHeroCtas}>
              <Link href="/self-test-survey" className="tp-btn tp-btn-inverse">
                Take the Eyelid Surgery Test
              </Link>
              <Link href="/contact" className="tp-btn" style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
                Book a Consultation
              </Link>
            </div>
          )}
        </div>

        {hasImage && (
          <div className={styles.tpPageHeroFrame}>
            {heroBadge && <span className={styles.tpPageHeroBadge}>{heroBadge}</span>}
            {/* Above the fold - this is the LCP element on condition pages. */}
            <Image
              src={heroImage!}
              alt={heroImageAlt || h1}
              fill
              sizes="(max-width: 860px) 100vw, 46vw"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
