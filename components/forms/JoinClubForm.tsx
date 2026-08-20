"use client";

import { useFormSubmit } from "./useFormSubmit";
import { FORMS } from "@/lib/forms/definitions";
import styles from "./Forms.module.css";
import RecaptchaField from "./RecaptchaField";

/**
 * "Join Dr Sabrina Club" — the membership sign-up form inside the modal on
 * /dr-sabrina-club (components/club/DrSabrinaClub.tsx).
 *
 * Replaces a third-party GoHighLevel iframe
 * (link.perfecteyesltd.com/widget/form/...) that used to sit in that modal —
 * unlike the site's other forms this one has no Contact Form 7 ancestor, so
 * its field names just follow the same your-name/your-email/your-phone
 * convention for consistency rather than matching an inherited definition.
 */

interface JoinClubFormProps {
  plans: { name: string; price: string }[];
  /** Pre-selects the plan whose "Choose {name}" button opened the modal. */
  initialPlan?: string;
  onClose: () => void;
}

export function JoinClubForm({ plans, initialPlan, onClose }: JoinClubFormProps) {
  const { status, fieldErrors, handleSubmit, pending, recaptchaRef } = useFormSubmit("club", {
    recaptcha: true,
  });

  if (status.kind === "success") {
    return (
      <>
        <p className={styles.popupLead} role="status">
          <strong>{FORMS.club.successHeading}</strong>
          <br />
          {status.message}
        </p>
        <button type="button" className={`tp-btn tp-btn-primary ${styles.submit}`} onClick={onClose}>
          Close
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.field}>
        <input id="club-name" name="your-name" type="text" required autoComplete="name" placeholder=" " className={styles.input} />
        <label htmlFor="club-name" className={styles.label}>Full Name *</label>
        {fieldErrors["your-name"] && <span className={styles.fieldError}>{fieldErrors["your-name"]}</span>}
      </div>

      <div className={styles.field}>
        <input id="club-email" name="your-email" type="email" required autoComplete="email" placeholder=" " className={styles.input} />
        <label htmlFor="club-email" className={styles.label}>Email *</label>
        {fieldErrors["your-email"] && <span className={styles.fieldError}>{fieldErrors["your-email"]}</span>}
      </div>

      <div className={styles.field}>
        <input id="club-phone" name="your-phone" type="tel" required autoComplete="tel" placeholder=" " className={styles.input} />
        <label htmlFor="club-phone" className={styles.label}>Phone *</label>
        {fieldErrors["your-phone"] && <span className={styles.fieldError}>{fieldErrors["your-phone"]}</span>}
      </div>

      <div className={styles.field}>
        <select
          id="club-plan"
          name="plan"
          required
          defaultValue={initialPlan ?? ""}
          className={styles.select}
        >
          <option value="" disabled>Select a plan&hellip;</option>
          {plans.map((plan) => (
            <option key={plan.name} value={plan.name}>
              {plan.name} - {plan.price}/month
            </option>
          ))}
        </select>
        <label htmlFor="club-plan" className={styles.label}>Plan *</label>
        {fieldErrors["plan"] && <span className={styles.fieldError}>{fieldErrors["plan"]}</span>}
      </div>

      <label className={styles.consent} htmlFor="club-consent">
        <input id="club-consent" name="consent-checkbox" type="checkbox" value="1" />
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
  );
}
