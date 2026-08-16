"use client";

import { useFormSubmit } from "./useFormSubmit";
import styles from "./Forms.module.css";

/**
 * "Contact form 1" — the general-purpose enquiry form.
 *
 * Field names are inherited from the original Contact Form 7 definition
 * so the notification emails keep the shape Boxly already parses:
 *   your-name*, your-email*, your-subject*, your-message
 *
 * Nothing in the site currently mounts this form; it exists so all six CF7
 * forms have a component, and can be dropped onto any page as-is.
 */
export default function GeneralContactForm({ title = "Send us a message" }: { title?: string }) {
  const { status, fieldErrors, handleSubmit, pending } = useFormSubmit("general");

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="gc-name">Your name</label>
          <input id="gc-name" name="your-name" type="text" required autoComplete="name" className={styles.input} />
          {fieldErrors["your-name"] && <span className={styles.fieldError}>{fieldErrors["your-name"]}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="gc-email">Your email</label>
          <input id="gc-email" name="your-email" type="email" required autoComplete="email" className={styles.input} />
          {fieldErrors["your-email"] && <span className={styles.fieldError}>{fieldErrors["your-email"]}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="gc-subject">Subject</label>
          <input id="gc-subject" name="your-subject" type="text" required className={styles.input} />
          {fieldErrors["your-subject"] && <span className={styles.fieldError}>{fieldErrors["your-subject"]}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="gc-message">Your message (optional)</label>
          <textarea id="gc-message" name="your-message" rows={5} className={styles.textarea} />
        </div>

        {(status.kind === "success" || status.kind === "error") && (
          <p
            role="status"
            className={`${styles.status} ${status.kind === "success" ? styles.statusOk : styles.statusError}`}
          >
            {status.message}
          </p>
        )}

        <button type="submit" className={`tp-btn tp-btn-primary ${styles.submit}`} disabled={pending}>
          {pending ? "Sending…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
