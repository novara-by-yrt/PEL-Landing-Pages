import { Fragment } from "react";
import { TpIcon } from "@/components/treatment/TpIcon";
import CallbackForm from "./CallbackForm";
import styles from "./ContactSection.module.css";

/**
 * Clinic contact details.
 *
 * These match the values already published in the site footer, which is the
 * only record of them in the repository. The design mock this section was
 * built from shows a different phone number, email and street address — if
 * those are the current ones, change them here AND in components/layout/
 * Footer.tsx together, so the page never states two different numbers.
 */
const CLINIC = {
  phoneDisplay: "020 7486 4886",
  phoneHref: "tel:+442074864886",
  email: "perfecteyesltd@gmail.com",
  address: "Perfect Eyes Ltd, 9 Harley Street, London, W1G 9QY",
  hours: [
    { day: "Mon – Fri", time: "9:30am – 6:00pm" },
    { day: "Sat & Sun", time: "Closed" },
  ],
};

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CLINIC.address,
)}`;

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/drsabrinashahdesaiofficial/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/perfecteyesltd",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.2l4.2 5.6L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z" />
      </svg>
    ),
  },
];

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
              consultation at Harley Street.
            </p>

            <div className={styles.rows}>
              <div className={styles.row}>
                <span className={styles.rowIcon}>
                  <TpIcon name="phone" size={19} />
                </span>
                <span>
                  <span className={styles.rowLabel}>Call or message</span>
                  <a href={CLINIC.phoneHref} className={styles.rowValue}>
                    {CLINIC.phoneDisplay}
                  </a>
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
                  {social.icon}
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
