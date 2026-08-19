declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fired once a form has actually sent — the equivalent of Contact Form's
 * `wpcf7mailsent` event, which is what the previous site's tracking hooked
 * into. Two calls, matching that setup exactly:
 *
 * - `fbq('track', 'Lead')` — the previous site fired this from a standalone
 *   listener wired directly to the pixel. There is no GA4/Ads equivalent to
 *   call directly here, because this site doesn't load gtag.js itself.
 * - `dataLayer.push(...)` — the previous site's CF7-Google-Analytics plugin
 *   pushed this same shape (event: 'Contact Form') alongside its direct
 *   gtag() call, for GTM-driven tags to pick up. GTM owns GA4 and Ads on
 *   this site (see components/analytics/Tracking), so the dataLayer push is
 *   the only mechanism that reaches them — dropping it would silently lose
 *   whatever conversion tags in GTM are wired to that event.
 *
 * Safe to call even when a tool never loaded (env var unset, ad blocker,
 * still loading) — both globals are optional and checked before use.
 */
export function trackFormSubmitted(formLabel: string) {
  window.fbq?.("track", "Lead");

  window.dataLayer?.push({
    event: "Form Submission",
    event_action: "Mail Sent",
    event_label: formLabel,
  });
}
