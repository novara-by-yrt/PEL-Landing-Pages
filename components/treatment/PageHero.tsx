import Link from "next/link";
import Image from "next/image";
import { TpIcon } from "./TpIcon";
import styles from "./PageHero.module.css";

export function PageHero({
  breadcrumbItems,
  siteUrl,
  eyebrow,
  h1,
  lead,
  heroImage,
  heroImageAlt,
  heroBadge,
}: {
  breadcrumbItems: { name: string; url: string }[];
  siteUrl: string;
  eyebrow?: string;
  h1: string;
  lead?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroBadge?: string;
}) {
  const hasImage = Boolean(heroImage);

  return (
    <section className={styles.tpPageHero}>

      <div className={styles.tpPageHeroGlow} />
      <div className={`${styles.tpPageHeroInner}${hasImage ? ` ${styles.hasImage}` : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className={styles.tpPageBreadcrumb}>
            {breadcrumbItems.map((item, index) => (
              <span key={`${item.url}-${index}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {index > 0 && <span aria-hidden="true">/</span>}
                {index === breadcrumbItems.length - 1 || !item.url ? (
                  <span style={{ color: "rgba(255,255,255,0.9)" }}>{item.name}</span>
                ) : (
                  <Link href={item.url.replace(siteUrl, "") || "/"}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>

          {eyebrow && (
            <span className="tp-eyebrow">
              <TpIcon name="sparkle" size={13} />
              {eyebrow}
            </span>
          )}

          <h1>{h1}</h1>

          {lead && <p className={styles.tpPageLead}>{lead}</p>}

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
            {/* Above the fold — this is the LCP element on condition pages. */}
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
