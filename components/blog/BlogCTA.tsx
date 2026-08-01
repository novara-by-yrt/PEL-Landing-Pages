import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
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
            Book Now <TpIcon name="arrow" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
