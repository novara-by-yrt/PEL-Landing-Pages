import type { Page } from "@playwright/test";
import { FORMS, type FormKey } from "@/lib/forms/definitions";

/**
 * Every form on the site is tested with this exact text in its name/message
 * fields, so a real inbox (or a developer skimming test output) can tell a
 * Playwright run apart from a genuine enquiry at a glance.
 */
export const DUMMY_TEXT = "Testing please ignore this.";
export const DUMMY_EMAIL = "testing-please-ignore@example.com";
export const DUMMY_PHONE = "07700900000";

/**
 * Stubs Google's reCAPTCHA v2 explicit-render script instead of loading the
 * real one — every form on the site now requires a checkbox widget (see
 * components/forms/useFormSubmit.ts), and a real widget needs an actual
 * human to click it, which a Playwright run can't do. The stub renders
 * instantly-"completed" so submission proceeds; it calls
 * `window.__recaptchaOnLoad` itself since that's the mechanism the real
 * script uses too (the `onload=` query param names a global callback,
 * independent of the `<script>` tag's own native load event).
 */
export async function mockRecaptcha(page: Page) {
  await page.route("https://www.google.com/recaptcha/api.js**", (route) => {
    route.fulfill({
      contentType: "application/javascript",
      body: `
        window.grecaptcha = {
          render: (container, params) => {
            container.textContent = "[reCAPTCHA stub]";
            return 1;
          },
          getResponse: (widgetId) => "test-stub-token",
          reset: (widgetId) => {},
        };
        if (window.__recaptchaOnLoad) window.__recaptchaOnLoad();
      `,
    });
  });
}

/**
 * Stubs POST /api/forms so a test run never sends a real email through
 * Mailgun. Returns the same shape and message the real route would for a
 * successful submission of `formKey`, so the assertion stays true to what
 * the server actually says rather than a hand-copied string that can drift.
 */
export async function mockFormsApiSuccess(page: Page, formKey: FormKey) {
  await page.route("**/api/forms", (route) => {
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ status: "sent", message: FORMS[formKey].successMessage }),
    });
  });
}

/**
 * The on-load popup (components/forms/OnLoadPopupForm.tsx) is mounted in
 * the root layout, so it opens 8s after *any* page loads unless recently
 * dismissed — including pages under test for a completely different form,
 * where it would then sit on top of that form and swallow clicks. Every
 * spec other than popup.spec.ts calls this before navigating so the popup
 * never appears in the first place.
 */
export async function suppressOnLoadPopup(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem("pel-popup-dismissed", String(Date.now()));
  });
}
