"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookieConsent, setCookieConsent } from "@/lib/cookie-consent";
import styles from "./CookieConsent.module.css";

/**
 * UK GDPR/PECR cookie banner. Accept and reject are equally prominent —
 * regulatory guidance is explicit that rejecting must be no harder than
 * accepting, so this is never a single "OK" button that implies consent.
 *
 * Renders nothing until after the client has checked localStorage, so a
 * visitor who already chose never sees a flash of the banner on navigation.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    setCookieConsent(value);
    setVisible(false);
  };

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <div className={styles.card}>
        <p className={styles.text}>
          We use cookies to run this site and, with your consent, to understand how it&rsquo;s
          used. See our{" "}
          <Link href="/privacy-notice-1" className={styles.link}>
            privacy notice
          </Link>{" "}
          for details.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.reject}`}
            onClick={() => choose("rejected")}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.accept}`}
            onClick={() => choose("accepted")}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
