import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import { CLINIC } from "@/lib/clinic";
import styles from "./BeginJourney.module.css";

/**
 * Consultation fees, as published on the contact page
 * (content/pages/contact-cosmetic-eye-surgeon.mdx). Keep the two in step.
 */
const CONSULTATION_FEES = [
  { label: "New Consultation", price: "£300" },
  { label: "Revision / 2nd Opinion", price: "£400" },
  { label: "Follow-up / Review", price: "From £200" },
];

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
              <a href={CLINIC.phoneHref} className="tp-btn tp-btn-outline-light">
                <TpIcon name="phone" size={17} />
                {CLINIC.phoneDisplay}
              </a>
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
