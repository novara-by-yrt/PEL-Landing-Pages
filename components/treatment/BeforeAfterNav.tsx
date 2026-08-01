import Link from "next/link";
import { TpIcon } from "./TpIcon";
import styles from "./BeforeAfterNav.module.css";

export function BeforeAfterNav({
  items,
  currentSlug,
}: {
  items: { slug: string; title: string }[];
  currentSlug: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <section className="tp-section tp-fog">
      <div className="container">
        <div className="tp-head">
          <span className="tp-eyebrow">
            <TpIcon name="search" size={13} />
            Browse by procedure
          </span>
          <h2>Explore More Before &amp; After Results</h2>
        </div>
        <nav className={styles.tpBanavList} aria-label="Before and after galleries by procedure">
          {items.map((item) => {
            const isCurrent = item.slug === currentSlug;
            return (
              <Link
                key={item.slug}
                href={`/before-after/${item.slug}`}
                className={styles.tpBanavLink}
                aria-current={isCurrent ? "page" : undefined}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
