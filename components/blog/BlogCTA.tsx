import Link from "next/link";
import styles from "./BlogCTA.module.css";

export function BlogCTA() {
  return (
    <section className="tp-section">
      <div className="container">
        <div className={styles.blogCtaBand}>
          <div className={styles.blogCtaGlow} />
          <h2>Book Your Consultation Today</h2>
          <p>Get personalised advice and expert care from our top medical professionals.</p>
          <Link href="/contact" className="tp-btn tp-btn-inverse" style={{ position: "relative" }}>
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
