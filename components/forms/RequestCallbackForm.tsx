"use client";

import { useState } from "react";
import Reveal from "@/components/shared/Reveal";
import { useFormSubmit } from "./useFormSubmit";
import { FORMS } from "@/lib/forms/definitions";
import styles from "@/components/home/ContactSection.module.css";
import RecaptchaField from "./RecaptchaField";

/**
 * "Request A Call Back" — the home page contact panel.
 *
 * Field names are inherited from the original Contact Form 7 definition
 * so the notification emails keep the shape Boxly already parses:
 *   your-name*, your-email*, your-phone*, your-message, consent, your-phone-full
 */

function UserIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.7 16.6v2.7a1.8 1.8 0 0 1-2 1.8 17.9 17.9 0 0 1-7.8-2.8 17.6 17.6 0 0 1-5.4-5.4A17.9 17.9 0 0 1 2.7 5.1 1.8 1.8 0 0 1 4.4 3.3h2.7a1.8 1.8 0 0 1 1.8 1.5c.1.8.4 1.7.7 2.4a1.8 1.8 0 0 1-.4 1.9L8 10.4a14.4 14.4 0 0 0 5.4 5.4l1.3-1.2a1.8 1.8 0 0 1 1.9-.4c.8.3 1.6.6 2.4.7a1.8 1.8 0 0 1 1.7 1.7z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.7-.8L3 20.5l1.4-4.2A8.2 8.2 0 0 1 3.6 12a8.4 8.4 0 0 1 8.4-8.4h.5A8.4 8.4 0 0 1 21 11.5z" />
    </svg>
  );
}

export default function RequestCallbackForm() {
  const { status, fieldErrors, handleSubmit, pending, recaptchaRef } = useFormSubmit("callback", {
    recaptcha: true,
  });
  // CF7 carries a hidden `your-phone-full` alongside the visible number; in
  // WordPress an intl-tel-input widget fills it. Mirroring the typed value
  // keeps the mail template's tag populated rather than blank.
  const [phone, setPhone] = useState("");

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Request a call back</h3>

      {/* The design labels fields with placeholders only. Sighted users get
          that; the visually hidden labels below give everyone else the same
          information, and keep each control properly named. */}
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <span className={styles.fieldIcon}><UserIcon /></span>
          <input id="cb-name" name="your-name" type="text" required autoComplete="name" placeholder=" " className={styles.input} />
          <label htmlFor="cb-name" className={styles.label}>Full Name *</label>
        </div>
        {fieldErrors["your-name"] && <p className={styles.status}>{fieldErrors["your-name"]}</p>}

        <div className={styles.field}>
          <span className={styles.fieldIcon}><MailIcon /></span>
          <input id="cb-email" name="your-email" type="email" required autoComplete="email" placeholder=" " className={styles.input} />
          <label htmlFor="cb-email" className={styles.label}>Email *</label>
        </div>
        {fieldErrors["your-email"] && <p className={styles.status}>{fieldErrors["your-email"]}</p>}

        <div className={styles.field}>
          <span className={styles.fieldIcon}><PhoneIcon /></span>
          <input
            id="cb-phone"
            name="your-phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder=" "
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="cb-phone" className={styles.label}>Phone *</label>
          <input type="hidden" name="your-phone-full" value={phone} readOnly />
        </div>
        {fieldErrors["your-phone"] && <p className={styles.status}>{fieldErrors["your-phone"]}</p>}

        <div className={styles.field}>
          <span className={`${styles.fieldIcon} ${styles.fieldIconArea}`}><MessageIcon /></span>
          <textarea id="cb-message" name="your-message" rows={5} placeholder=" " className={styles.textarea} />
          <label htmlFor="cb-message" className={styles.label}>Message (optional)</label>
        </div>

        <label className={styles.consent} htmlFor="cb-consent">
          <input id="cb-consent" name="consent" type="checkbox" value="1" className={styles.checkbox} />
          <span>Yes, I&rsquo;d like to receive updates, offers and tips by email, SMS or phone.</span>
        </label>

        <RecaptchaField innerRef={recaptchaRef} />

        {status.kind === "success" || status.kind === "error" ? (
          <Reveal>
            <p
              role="status"
              className={`${styles.status} ${
                status.kind === "success" ? styles.statusOk : styles.statusError
              }`}
            >
              {status.kind === "success" ? (
                <>
                  <strong>{FORMS.callback.successHeading}</strong> {status.message}
                </>
              ) : (
                status.message
              )}
            </p>
          </Reveal>
        ) : null}

        <button type="submit" className={`tp-btn tp-btn-primary tp-btn-lg ${styles.submit}`} disabled={pending}>
          {pending ? "Sending…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
