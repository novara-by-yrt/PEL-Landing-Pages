import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={`tp ${styles.page}`}>
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <span className={styles.eyebrow}>
          <TpIcon name="compass" size={13} />
          Lost your way?
        </span>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.lead}>
          The page you&rsquo;re looking for may have been moved or no longer exists.
        </p>

        <div className={styles.actions}>
          <Link href="/" className="tp-btn tp-btn-primary">
            Back to Home
            <span className="tp-btn-arrow" aria-hidden="true">
              <TpIcon name="arrow" size={16} />
            </span>
          </Link>
          <Link href="/blog" className="tp-btn tp-btn-secondary">
            Browse Articles
          </Link>
          <Link href="/contact" className="tp-btn tp-btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
