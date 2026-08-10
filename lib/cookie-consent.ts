/**
 * Minimal cookie-consent state, shared between the banner and (later) any
 * analytics/tracking script that needs to check before it loads.
 *
 * Stored in localStorage rather than a cookie — the choice about whether
 * non-essential cookies may be set doesn't itself need to be a cookie, and
 * localStorage avoids sending it back to the server on every request.
 */
export type CookieConsentValue = "accepted" | "rejected";

/** What a reader can observe. `null` means "no choice made yet"; `"unknown"`
 *  is only ever the server's answer, since localStorage isn't readable during
 *  SSR — the two must stay distinct so the banner isn't rendered into the
 *  server HTML and then yanked away from a visitor who already chose. */
export type CookieConsentSnapshot = CookieConsentValue | "unknown" | null;

const STORAGE_KEY = "pel-cookie-consent";
const CHANGE_EVENT = "pel-cookie-consent-change";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
}

/* ── useSyncExternalStore adapters ──────────────────────────────────────── */

/** `storage` too, so a choice made in one tab settles the banner in others. */
export function subscribeToCookieConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getCookieConsentSnapshot(): CookieConsentSnapshot {
  return getCookieConsent();
}

export function getServerCookieConsentSnapshot(): CookieConsentSnapshot {
  return "unknown";
}

/** Whether it's currently OK to load non-essential (e.g. analytics) scripts. */
export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === "accepted";
}
