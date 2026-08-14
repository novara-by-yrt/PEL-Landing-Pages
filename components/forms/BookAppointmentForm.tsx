"use client";

import Link from "next/link";
import { TpIcon } from "@/components/treatment/TpIcon";
import { useFormSubmit } from "./useFormSubmit";
import styles from "@/app/contact/page.module.css";

/**
 * "Book an Appointment" — the /contact page form.
 *
 * Field names are inherited from the original Contact Form 7 definition
 * so the notification emails keep the shape Boxly already parses:
 *   your-name*, your-email*, your-phone*, preferred-time*, enquiry-type*,
 *   contact-method[]*, your-message, consent-checkbox
 *
 * `enquiry-type` carries the full 27-option treatment list from CF7, which
 * replaces the shorter hand-maintained list the React form used to hold.
 */

const PREFERRED_TIMES = ["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM"];

const CONTACT_METHODS = ["Phone", "Email", "SMS"];

const ENQUIRY_TYPES = [
  "Eyelid surgery/Blepharoplasty",
  "Ptosis",
  "Festoons/Malar bags",
  "Tear through fillers",
  "Polynucleotides",
  "Sofwave",
  "Other",
  "Upper Eyelid Blepharoplasty",
  "Lower Eye Bag Removal",
  "Double Eyelid Surgery",
  "Eyelid Lump & Bump Removal",
  "Revision Eyelid Surgery",
  "Midface Lift",
  "Brow Lift Surgery",
  "Thyroid Lid Lowering Surgery",
  "Non-Surgical Eyelid Blepharoplasty",
  "Temple Fillers",
  "Periorbital Wrinkle Management",
  "Microneedling Treatment",
  "Plexr/Plasma Pen Treatment",
  "Non Surgical Facial Contouring",
  "Endolift Treatment",
  "Ellansé Biostimulation",
  "EMFACE Treatment",
  "Radiofrequency Treatment",
  "Teoxane babyGLOW Skin (Redensity 1)",
  "Perfect360 Skin",
];

export default function BookAppointmentForm() {
  const { status, fieldErrors, handleSubmit, reset, pending } = useFormSubmit("appointment");

  if (status.kind === "success") {
    return (
      <div className={styles.contactSuccess}>
        <div className={styles.contactSuccessIcon}><TpIcon name="check" size={26} /></div>
        <h2>Message Sent!</h2>
        <p>{status.message}</p>
        <button onClick={reset} className="tp-btn tp-btn-secondary">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="contact-form">
      <h2>Book an Appointment</h2>

      <div className={styles.contactFormRow}>
        <div>
          <label htmlFor="contact-name" className={styles.contactLabel}>
            Full Name <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
          </label>
          <input id="contact-name" type="text" name="your-name" required autoComplete="name" placeholder="Full Name" className={styles.contactInput} />
          {fieldErrors["your-name"] && <span className={styles.contactFieldError}>{fieldErrors["your-name"]}</span>}
        </div>
        <div>
          <label htmlFor="contact-email" className={styles.contactLabel}>
            Email Address <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
          </label>
          <input id="contact-email" type="email" name="your-email" required autoComplete="email" placeholder="Email address" className={styles.contactInput} />
          {fieldErrors["your-email"] && <span className={styles.contactFieldError}>{fieldErrors["your-email"]}</span>}
        </div>
      </div>

      <div className={styles.contactFormRow}>
        <div>
          <label htmlFor="contact-phone" className={styles.contactLabel}>
            Phone Number <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
          </label>
          <input id="contact-phone" type="tel" name="your-phone" required autoComplete="tel" placeholder="Phone" className={styles.contactInput} />
          {fieldErrors["your-phone"] && <span className={styles.contactFieldError}>{fieldErrors["your-phone"]}</span>}
        </div>
        <div>
          <label htmlFor="contact-time" className={styles.contactLabel}>
            Preferred Contact Time <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
          </label>
          <select id="contact-time" name="preferred-time" required defaultValue="" className={styles.contactInput}>
            <option value="" disabled>Please choose an ideal time for us to contact you</option>
            {PREFERRED_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {fieldErrors["preferred-time"] && <span className={styles.contactFieldError}>{fieldErrors["preferred-time"]}</span>}
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="contact-enquiry" className={styles.contactLabel}>
          Which of these are you enquiring about? <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
        </label>
        <select id="contact-enquiry" name="enquiry-type" required defaultValue="" className={styles.contactInput}>
          <option value="" disabled>Which of these are you enquiring about?</option>
          {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {fieldErrors["enquiry-type"] && <span className={styles.contactFieldError}>{fieldErrors["enquiry-type"]}</span>}
      </div>

      <fieldset style={{ border: 0, padding: 0, margin: "0 0 1rem" }}>
        <legend className={styles.contactLabel}>
          How may we contact you? <span aria-hidden="true" style={{ color: "#B3261E" }}>*</span>
        </legend>
        <div className={styles.contactCheckGroup}>
          {CONTACT_METHODS.map((m) => (
            <label key={m} className={styles.contactCheckOption} htmlFor={`contact-method-${m}`}>
              <input id={`contact-method-${m}`} type="checkbox" name="contact-method[]" value={m} />
              <span>{m}</span>
            </label>
          ))}
        </div>
        {fieldErrors["contact-method"] && <span className={styles.contactFieldError}>{fieldErrors["contact-method"]}</span>}
      </fieldset>

      <div style={{ marginBottom: "1.25rem" }}>
        <label htmlFor="contact-message" className={styles.contactLabel}>Your Message</label>
        <textarea id="contact-message" name="your-message" rows={5} placeholder="Message" className={styles.contactInput} style={{ resize: "vertical" }} />
      </div>

      <label className={styles.contactConsent} htmlFor="contact-consent">
        <input id="contact-consent" name="consent-checkbox" type="checkbox" value="1" />
        <span>Yes, I&rsquo;d like to receive updates, offers and tips by email, SMS or phone.</span>
      </label>

      {status.kind === "error" && (
        <div role="alert" className={styles.contactError}>{status.message}</div>
      )}

      <button type="submit" id="contact-submit" disabled={pending} className={`tp-btn tp-btn-primary ${styles.contactSubmit}`}>
        {pending ? "Sending…" : "Book an appointment"}
      </button>

      <p style={{ fontSize: "0.75rem", color: "var(--tp-mist)", marginTop: "1rem", textAlign: "center" }}>
        By submitting this form you agree to our{" "}
        <Link href="/privacy-notice" style={{ color: "var(--tp-indigo-700)" }}>Privacy Notice</Link>.
      </p>
    </form>
  );
}
