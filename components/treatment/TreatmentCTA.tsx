import Link from "next/link";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { TpIcon } from "./TpIcon";
import styles from "./TreatmentCTA.module.css";

export function TreatmentCTA() {
  return (
    <section className="tp-section">
      <div className="container">
        <div className={styles.tpCtaBand}>
          <div className={styles.tpCtaGlow} />
          <div style={{ position: "relative" }}>
            <h2>Book Your Consultation Today</h2>
            <p>Get personalised advice and expert care from our top medical professionals at 9 Harley Street, London.</p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="tp-btn tp-btn-inverse">Book a Consultation <TpIcon name="arrow" size={17} /></Link>
              <ClinicPhone
                className="tp-btn"
                style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
                icon
                iconSize={16}
              />
            </div>
          </div>
          <div className={styles.tpCtaInfo}>
            <div className={styles.tpCtaInfoLabel}>Visit us</div>
            <div className={styles.tpCtaInfoRow}><TpIcon name="pin" size={15} />9 Harley Street, London</div>
            <div className={styles.tpCtaInfoRow}><TpIcon name="clock" size={15} />Mon–Fri, 9:30am–6pm</div>
          </div>
        </div>
      </div>
    </section>
  );
}
