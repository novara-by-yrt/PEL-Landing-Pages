import { Fragment } from "react";
import ClinicPhone from "@/components/shared/ClinicPhone";
import { TpIcon } from "@/components/treatment/TpIcon";
import CallbackForm from "./CallbackForm";
import styles from "./ContactSection.module.css";

import { CLINIC, MAPS_URL, SOCIALS } from "@/lib/clinic";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  "X / Twitter": (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6L17.5 3z" />
    </svg>
  ),
};

function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 16L16 8M9.5 8H16v6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
                  <a href={`mailto:${CLINIC.email}`} className={styles.rowValue}>
                    {CLINIC.email}
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
                    <ExternalArrow />
                  </a>
                </span>
              </div>
            </div>

            <div className={styles.socials}>
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                >
                  {SOCIAL_ICONS[social.label]}
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <CallbackForm />
        </div>
      </div>
    </section>
  );
}
