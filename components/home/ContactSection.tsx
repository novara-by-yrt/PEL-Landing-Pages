import { Fragment } from "react";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { TpIcon } from "@/components/treatment/TpIcon";
import RequestCallbackForm from "@/components/forms/RequestCallbackForm";
import styles from "./ContactSection.module.css";

import { CLINIC, MAPS_URL } from "@/lib/clinic";

/* The social accounts are not linked here — the footer carries them on every
   page, so repeating them in this panel was a second copy of the same links
   directly above the first. They still live in lib/clinic. */

export default function ContactSection() {
  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.panel}>
          <div>
            <span className={styles.eyebrow}>
              <TpIcon name="mail" size={14} />
              Contact us
            </span>
            <h2 id="contact-title" className={styles.title}>
              Contact our clinic
            </h2>
            <p className={styles.lead}>
              Speak to our team about which treatment suits you, or arrange a private
              consultation at 121 Harley Street.
            </p>

            <div className={styles.rows}>
              <div className={styles.row}>
                <span className={styles.rowIcon}>
                  <TpIcon name="phone" size={19} />
                </span>
                <span>
                  <span className={styles.rowLabel}>Call or message</span>
                  <ClinicPhone className={styles.rowValue} />
                </span>
              </div>

              <div className={styles.row}>
                <span className={styles.rowIcon}>
                  <TpIcon name="mail" size={19} />
                </span>
                <span>
                  <span className={styles.rowLabel}>Email us</span>
                  {/* Offered a break at the @ rather than left to the browser,
                      which otherwise splits the address mid-word on a narrow
                      screen ("enquiries@perfecte / yesltd.com"). */}
                  <a href={`mailto:${CLINIC.email}`} className={styles.rowValue}>
                    {CLINIC.email.split("@")[0]}@<wbr />
                    {CLINIC.email.split("@")[1]}
                  </a>
                </span>
              </div>

              <div className={styles.row}>
                <span className={styles.rowIcon}>
                  <TpIcon name="clock" size={19} />
                </span>
                <span>
                  <span className={styles.rowLabel}>Opening hours</span>
                  <span className={styles.hours}>
                    {CLINIC.hours.map((slot) => (
                      <Fragment key={slot.day}>
                        <span className={styles.hoursDay}>{slot.day}</span>
                        <span className={styles.hoursTime}>{slot.time}</span>
                      </Fragment>
                    ))}
                  </span>
                </span>
              </div>

              <div className={styles.row}>
                <span className={styles.rowIcon}>
                  <TpIcon name="pin" size={19} />
                </span>
                <span>
                  <span className={styles.rowLabel}>Our location</span>
                  <span className={styles.rowValue}>{CLINIC.address}</span>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directions}
                  >
                    Get directions
                  </a>
                </span>
              </div>
            </div>
          </div>

          <RequestCallbackForm />
        </div>
      </div>
    </section>
  );
}
