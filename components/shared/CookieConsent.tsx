"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getCookieConsentSnapshot,
  getServerCookieConsentSnapshot,
  setCookieConsent,
  subscribeToCookieConsent,
} from "@/lib/cookie-consent";
import styles from "./CookieConsent.module.css";

/**
 * UK GDPR/PECR cookie banner. Accept and reject are equally prominent —
 * regulatory guidance is explicit that rejecting must be no harder than
 * accepting, so this is never a single "OK" button that implies consent.
 *
 * Renders nothing until the client has read localStorage (the server
 * snapshot is "unknown"), so a visitor who already chose never sees a flash
 * of the banner. Read through useSyncExternalStore rather than a
 * setState-in-effect: localStorage plus its change event is exactly the
 * "external store" that hook exists for, and it keeps the value consistent
 * if a choice is made in another tab.
 */
export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot
  );

  // "unknown" (server / pre-hydration) and a stored choice both render nothing.
  if (consent !== null) return null;

  const choose = (value: "accepted" | "rejected") => setCookieConsent(value);

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
