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

test.describe("Join Dr Sabrina Club form (/dr-sabrina-club)", () => {
  test("preselects the chosen plan, submits, and shows a tailored success message", async ({
    page,
  }) => {
    await suppressOnLoadPopup(page);
    await mockRecaptcha(page);
    await mockFormsApiSuccess(page, "club");
    await page.goto("/dr-sabrina-club");

    // Opening via a specific plan card's "Choose X" button should preselect
    // that plan in the form, rather than leaving it on the empty placeholder.
    await page.getByRole("button", { name: "Choose The Eye Edit" }).click();

    const dialog = page.getByRole("dialog", { name: "Join Dr Sabrina Club" });
    await expect(dialog.locator("#club-plan")).toHaveValue("The Eye Edit");

    await dialog.locator("#club-name").fill(DUMMY_TEXT);
    await dialog.locator("#club-email").fill(DUMMY_EMAIL);
    await dialog.locator("#club-phone").fill(DUMMY_PHONE);

    await dialog.getByRole("button", { name: "Submit" }).click();

    const status = dialog.getByRole("status");
    await expect(status).toContainText(FORMS.club.successHeading);
    await expect(status).toContainText(FORMS.club.successMessage);
  });
});
