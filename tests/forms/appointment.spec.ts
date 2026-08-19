import { test, expect } from "@playwright/test";
import { FORMS } from "@/lib/forms/definitions";
import { DUMMY_TEXT, DUMMY_EMAIL, DUMMY_PHONE, mockFormsApiSuccess, suppressOnLoadPopup } from "./helpers";

test.describe("Book an Appointment form (/contact)", () => {
  test("submits and shows a tailored success message", async ({ page }) => {
    await suppressOnLoadPopup(page);
    await mockFormsApiSuccess(page, "appointment");
    await page.goto("/contact");

    const form = page.locator("#contact-form");
    await form.locator("#contact-name").fill(DUMMY_TEXT);
    await form.locator("#contact-email").fill(DUMMY_EMAIL);
    await form.locator("#contact-phone").fill(DUMMY_PHONE);
    await form.locator("#contact-time").selectOption({ index: 1 });
    await form.locator("#contact-enquiry").selectOption({ index: 1 });
    // The consent label's copy ("...by email, SMS or phone") also contains
    // the substring "email", so this needs the id rather than an accessible
    // name to avoid matching both checkboxes.
    await form.locator("#contact-method-Email").check();
    await form.locator("#contact-message").fill(DUMMY_TEXT);

    await form.getByRole("button", { name: "Book an appointment" }).click();

    await expect(
      page.getByRole("heading", { name: FORMS.appointment.successHeading })
    ).toBeVisible();
    await expect(page.getByRole("status")).toContainText(FORMS.appointment.successMessage);
  });
});
