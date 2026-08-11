import { Fragment } from "react";
import Link from "next/link";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC } from "@/lib/clinic";
import { TpIcon } from "./TpIcon";
import styles from "./TreatmentCTA.module.css";

/**
 * Closing CTA band.
 *
 * The address and opening hours come from lib/clinic rather than being typed
 * in here. They used to be hardcoded as "9 Harley Street" and "Mon–Fri,
 * 9:30am–6pm", which disagreed with the footer and the contact panel on every
 * treatment page.
 */
export function TreatmentCTA() {
  return (
    <section className="tp-section">
      <div className="container">
        <div className={styles.tpCtaBand}>
          <div className={styles.tpCtaGlow} />
          <div className={styles.tpCtaBody}>
            <h2>Book Your Consultation Today</h2>
            <span className={styles.tpCtaRule} aria-hidden="true" />
            <p>
              Get personalised advice and expert care from our top medical professionals at{" "}
              {CLINIC.addressShort}.
            </p>
            <div className={styles.tpCtaActions}>
              <Link href="/contact" className="tp-btn tp-btn-inverse">
                Book a Consultation
              </Link>
              <ClinicPhone className="tp-btn tp-btn-outline-light" icon iconSize={16} />
            </div>
          </div>

          <div className={styles.tpCtaInfo}>
            <div className={styles.tpCtaInfoLabel}>Visit us</div>
            <div className={styles.tpCtaInfoRow}>
              <span className={styles.tpCtaInfoIcon} aria-hidden="true">
                <TpIcon name="pin" size={15} />
              </span>
              {CLINIC.addressShort}
            </div>
            {CLINIC.hours.map((slot) => (
              <Fragment key={slot.day}>
                <div className={styles.tpCtaInfoRow}>
                  <span className={styles.tpCtaInfoIcon} aria-hidden="true">
                    <TpIcon name="clock" size={15} />
                  </span>
                  <span className={styles.tpCtaInfoDay}>{slot.day}</span>
                  <span className={styles.tpCtaInfoTime}>{slot.time}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
