/**
 * Minimal cookie-consent state, shared between the banner and (later) any
 * analytics/tracking script that needs to check before it loads.
 *
 * Stored in localStorage rather than a cookie — the choice about whether
 * non-essential cookies may be set doesn't itself need to be a cookie, and
 * localStorage avoids sending it back to the server on every request.
 */
export type CookieConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "pel-cookie-consent";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent("pel-cookie-consent-change", { detail: value }));
}

/** Whether it's currently OK to load non-essential (e.g. analytics) scripts. */
export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === "accepted";
}
