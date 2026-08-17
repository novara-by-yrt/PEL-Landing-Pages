import Link from "next/link";
import SafeImage from "@/components/shared/SafeImage";
import type { CatalogueCard } from "@/lib/catalogue";
import styles from "./CatalogueGrid.module.css";

/**
 * The card grid shared by /treatments and /conditions.
 *
 * Every image on these two pages is an /uploads path, which resolves against
 * the WordPress origin rather than this repository — so SafeImage rather than
 * a bare next/image: it routes the file through the optimiser and, when a
 * file is not on the origin, swaps in the clinic's eye mark instead of
 * leaving a broken icon in the middle of a grid of fifty-seven cards.
 */
export default function CatalogueGrid({
  items,
  /** Eagerly load this many cards — the ones a visitor lands on. */
  eager = 0,
  cta,
}: {
  items: CatalogueCard[];
  eager?: number;
  cta: string;
}) {
  return (
    <ul className={styles.grid}>
      {items.map((item, index) => (
        <li key={item.href} className={styles.card}>
          <Link href={item.href} className={styles.link}>
            <span className={styles.media}>
              <SafeImage
                src={item.image}
                alt=""
                sizes="(min-width: 1180px) 30vw, (min-width: 700px) 45vw, 92vw"
                priority={index < eager}
              />
            </span>

            <span className={styles.body}>
              <span className={styles.title}>{item.title}</span>
              {item.blurb ? <span className={styles.blurb}>{item.blurb}</span> : null}
              <span className={styles.cta} aria-hidden="true">
                {cta}
                <svg viewBox="0 0 24 24" className={styles.arrow}>
                  <path d="M5 12h14M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
