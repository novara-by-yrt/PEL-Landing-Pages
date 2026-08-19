import { test, expect } from "@playwright/test";
import { FORMS } from "@/lib/forms/definitions";
import {
  DUMMY_TEXT,
  DUMMY_EMAIL,
  DUMMY_PHONE,
  mockRecaptcha,
  mockFormsApiSuccess,
  suppressOnLoadPopup,
} from "./helpers";

test.describe("Request A Call Back form (homepage contact panel)", () => {
  test("submits and shows a tailored success message", async ({ page }) => {
    await suppressOnLoadPopup(page);
    await mockRecaptcha(page);
    await mockFormsApiSuccess(page, "callback");
    await page.goto("/");

    const heading = page.getByRole("heading", { name: "Contact our clinic" });
    await heading.scrollIntoViewIfNeeded();
    const form = page.locator("form").filter({ has: page.locator('input[name="your-phone-full"]') });

    await form.locator('input[name="your-name"]').fill(DUMMY_TEXT);
    await form.locator('input[name="your-email"]').fill(DUMMY_EMAIL);
    await form.locator('input[name="your-phone"]').fill(DUMMY_PHONE);
    await form.locator('textarea[name="your-message"]').fill(DUMMY_TEXT);

    await form.getByRole("button", { name: "Submit" }).click();

    const status = page.getByRole("status");
    await expect(status).toContainText(FORMS.callback.successHeading);
    await expect(status).toContainText(FORMS.callback.successMessage);
  });
});
