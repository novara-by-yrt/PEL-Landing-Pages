"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormSubmit } from "./useFormSubmit";
import { FORMS } from "@/lib/forms/definitions";
import styles from "./Forms.module.css";
import RecaptchaField from "./RecaptchaField";

/**
 * "On Load Popup Form" — the site-wide enquiry popup.
 *
 * Field names are inherited from the original Contact Form 7 definition
 * so the notification emails keep the shape Boxly already parses:
 *   your-name*, your-email*, your-phone*, your-message, consent-checkbox
 *
 * The popup opens once per DISMISS_DAYS after a short delay, so it does not
 * compete with first paint or reappear on every navigation.
 */

const STORAGE_KEY = "pel-popup-dismissed";
const OPEN_DELAY_MS = 15000;
const DISMISS_DAYS = 7;

function recentlyDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const age = Date.now() - Number(raw);
    return Number.isFinite(age) && age < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    // Private browsing or storage disabled — treat as never dismissed.
    return false;
  }
}

export default function OnLoadPopupForm() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* nothing we can do, and nothing that should break the page */
    }
    previouslyFocused.current?.focus();
  }, []);

  const { status, fieldErrors, handleSubmit, pending, recaptchaRef } = useFormSubmit("popup", {
    recaptcha: true,
  });

  useEffect(() => {
    if (recentlyDismissed()) return;
    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Move focus into the dialog on open and hold the page still behind it.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={dismiss}
      role="presentation"
    >
      <div
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.popupClose} onClick={dismiss} aria-label="Close">
          &times;
        </button>

        {status.kind === "success" ? (
          <>
            <h2 id="popup-title" className={styles.popupTitle}>{FORMS.popup.successHeading}</h2>
            <p className={styles.popupLead} role="status">{status.message}</p>
            <button type="button" className={`tp-btn tp-btn-primary ${styles.submit}`} onClick={dismiss}>
              Close
            </button>
          </>
        ) : (
          <>
            <h2 id="popup-title" className={styles.popupTitle}>Speak to our team</h2>
            <p className={styles.popupLead}>
              Leave your details and one of our specialists will be in touch to answer your questions.
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <input id="popup-name" name="your-name" type="text" required autoComplete="name" placeholder=" " className={styles.input} />
                <label htmlFor="popup-name" className={styles.label}>Full Name *</label>
                {fieldErrors["your-name"] && <span className={styles.fieldError}>{fieldErrors["your-name"]}</span>}
              </div>

              <div className={styles.field}>
                <input id="popup-email" name="your-email" type="email" required autoComplete="email" placeholder=" " className={styles.input} />
                <label htmlFor="popup-email" className={styles.label}>Email *</label>
                {fieldErrors["your-email"] && <span className={styles.fieldError}>{fieldErrors["your-email"]}</span>}
              </div>

              <div className={styles.field}>
                <input id="popup-phone" name="your-phone" type="tel" required autoComplete="tel" placeholder=" " className={styles.input} />
                <label htmlFor="popup-phone" className={styles.label}>Phone *</label>
                {fieldErrors["your-phone"] && <span className={styles.fieldError}>{fieldErrors["your-phone"]}</span>}
              </div>

              <div className={styles.field}>
                <textarea id="popup-message" name="your-message" rows={4} placeholder=" " className={styles.textarea} />
                <label htmlFor="popup-message" className={styles.label}>Message (optional)</label>
              </div>

              <label className={styles.consent} htmlFor="popup-consent">
                <input id="popup-consent" name="consent-checkbox" type="checkbox" value="1" />
                <span>Yes, I&rsquo;d like to receive updates, offers and tips by email, SMS or phone.</span>
              </label>

              <RecaptchaField innerRef={recaptchaRef} />

              {status.kind === "error" && (
                <p role="alert" className={`${styles.status} ${styles.statusError}`}>{status.message}</p>
              )}

              <button type="submit" className={`tp-btn tp-btn-primary ${styles.submit}`} disabled={pending}>
                {pending ? "Sending…" : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
