"use client";

import { TpIcon } from "@/components/treatment/TpIcon";
import { useFormSubmit } from "./useFormSubmit";
import styles from "@/components/blog/BlogContactForm.module.css";

/**
 * "Website Form (Blog Sidebar)" — the blog post sidebar.
 *
 * Field names are inherited from the original Contact Form 7 definition
 * so the notification emails keep the shape Boxly already parses:
 *   your-name*, your-email*, your-phone*, ideal-time*, contact-method*,
 *   enquiring-about*, consent-checkbox
 *
 * Note there is deliberately no message field — the CF7 definition does not
 * have one; it asks `enquiring-about` as a single line instead.
 */

const IDEAL_TIMES = ["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM"];
const CONTACT_METHODS = ["Email", "Phone", "Text"];

export function BlogSidebarForm() {
  const { status, fieldErrors, handleSubmit, pending } = useFormSubmit("blogSidebar", {
    recaptcha: true,
  });

  return (
    <div className={styles.blogConnectCard}>
      <span className="tp-eyebrow"><TpIcon name="quote" size={13} />Get in touch</span>
      <h3>Let&rsquo;s Connect Now</h3>
      <p className={styles.blogConnectLead}>
        Have a question about this article or your own eyes? Leave your details and our team will call you back.
      </p>

      {status.kind === "success" ? (
        <p className={styles.blogConnectSuccess}>{status.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Floating labels: input/select comes first in markup, label second —
              the label is absolutely positioned over the field and floats up
              via :placeholder-shown (inputs) or :valid (selects, since the
              disabled empty-value option fails the `required` constraint
              until a real one is picked). Removing the separate label row
              this replaced is what shortens the form. */}
          <div className={styles.blogConnectField}>
            <input id="blog-name" name="your-name" type="text" required autoComplete="name" placeholder=" " />
            <label htmlFor="blog-name">Full Name *</label>
            {fieldErrors["your-name"] && <span className={styles.blogConnectFieldError}>{fieldErrors["your-name"]}</span>}
          </div>

          <div className={styles.blogConnectField}>
            <input id="blog-email" name="your-email" type="email" required autoComplete="email" placeholder=" " />
            <label htmlFor="blog-email">Email *</label>
            {fieldErrors["your-email"] && <span className={styles.blogConnectFieldError}>{fieldErrors["your-email"]}</span>}
          </div>

          <div className={styles.blogConnectField}>
            <input id="blog-phone" name="your-phone" type="tel" required autoComplete="tel" placeholder=" " />
            <label htmlFor="blog-phone">Phone *</label>
            {fieldErrors["your-phone"] && <span className={styles.blogConnectFieldError}>{fieldErrors["your-phone"]}</span>}
          </div>

          <div className={styles.blogConnectField}>
            <select id="blog-time" name="ideal-time" required defaultValue="">
              <option value="" disabled></option>
              {IDEAL_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <label htmlFor="blog-time">Ideal time to contact you *</label>
            {fieldErrors["ideal-time"] && <span className={styles.blogConnectFieldError}>{fieldErrors["ideal-time"]}</span>}
          </div>

          <div className={styles.blogConnectField}>
            <select id="blog-method" name="contact-method" required defaultValue="">
              <option value="" disabled></option>
              {CONTACT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <label htmlFor="blog-method">How would you like to be contacted? *</label>
            {fieldErrors["contact-method"] && <span className={styles.blogConnectFieldError}>{fieldErrors["contact-method"]}</span>}
          </div>

          <div className={styles.blogConnectField}>
            <input id="blog-enquiry" name="enquiring-about" type="text" required placeholder=" " />
            <label htmlFor="blog-enquiry">What are you enquiring about? *</label>
            {fieldErrors["enquiring-about"] && <span className={styles.blogConnectFieldError}>{fieldErrors["enquiring-about"]}</span>}
          </div>

          <label className={styles.blogConnectConsent} htmlFor="blog-consent">
            <input id="blog-consent" name="consent-checkbox" type="checkbox" value="1" />
            <span>Yes, I&rsquo;d like to receive updates, offers and tips by email, SMS or phone.</span>
          </label>

          {status.kind === "error" && <p role="alert" className={styles.blogConnectError}>{status.message}</p>}

          <button type="submit" className="tp-btn tp-btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={pending}>
            {pending ? "Sending…" : "Request a Call Back"}
          </button>
        </form>
      )}
    </div>
  );
}
