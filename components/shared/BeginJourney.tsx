import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { CLINIC, CONSULTATION_FEES } from "@/lib/clinic";
import styles from "./BeginJourney.module.css";

/** Closing CTA panel, shared by the home page and the surgeon profile. */
export default function BeginJourney() {
  return (
    <section className={styles.beginSection} aria-labelledby="begin-title">
      <div className="container">
        <div className={styles.beginPanel}>
          <div className={styles.beginCopy}>
            <h2 id="begin-title" className={styles.beginTitle}>
              Begin your Perfect Eyes and Skin journey
            </h2>
            <p className={styles.beginLead}>
              Book a private consultation with Dr Shah-Desai at {CLINIC.addressShort}, or
              request a call back from our team.
            </p>
            <div className={styles.beginActions}>
              <Link href="/contact-cosmetic-eye-surgeon" className="tp-btn tp-btn-inverse">
                Book a Consultation
                <span className="tp-btn-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h13M12.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <ClinicPhone className="tp-btn tp-btn-outline-light" icon />
            </div>
          </div>

          <div className={styles.fees}>
            <p className={styles.feesLabel}>Consultation fees</p>
            <dl className={styles.feesList}>
              {CONSULTATION_FEES.map((fee) => (
                <div key={fee.label} className={styles.feesRow}>
                  <dt className={styles.feesName}>{fee.label}</dt>
                  <dd className={styles.feesPrice}>{fee.price}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.feesNote}>
              <TpIcon name="clock" size={15} />
              <span>{`${CLINIC.hours[0].day} ${CLINIC.hours[0].time} · Harley Street`}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
