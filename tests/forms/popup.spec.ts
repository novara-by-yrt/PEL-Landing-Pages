import { test, expect } from "@playwright/test";
import { FORMS } from "@/lib/forms/definitions";
import { DUMMY_TEXT, DUMMY_EMAIL, DUMMY_PHONE, mockRecaptcha, mockFormsApiSuccess } from "./helpers";

test.describe("On Load Popup Form (site-wide)", () => {
  test("opens after the delay, submits, and shows a tailored success message", async ({ page }) => {
    await mockRecaptcha(page);
    await mockFormsApiSuccess(page, "popup");
    await page.goto("/");

    // Opens 15s after mount unless dismissed in the last 7 days (see
    // components/forms/OnLoadPopupForm.tsx) — a fresh browser context here
    // has no localStorage entry, so it always opens.
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 20_000 });

    await dialog.locator("#popup-name").fill(DUMMY_TEXT);
    await dialog.locator("#popup-email").fill(DUMMY_EMAIL);
    await dialog.locator("#popup-phone").fill(DUMMY_PHONE);
    await dialog.locator("#popup-message").fill(DUMMY_TEXT);

    await dialog.getByRole("button", { name: "Submit" }).click();

    await expect(dialog.getByRole("heading", { name: FORMS.popup.successHeading })).toBeVisible();
    await expect(dialog.getByRole("status")).toContainText(FORMS.popup.successMessage);
  });
});
