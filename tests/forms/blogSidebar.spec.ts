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

test.describe("Website Form (blog post sidebar)", () => {
  test("submits and shows a tailored success message", async ({ page }) => {
    await suppressOnLoadPopup(page);
    await mockRecaptcha(page);
    await mockFormsApiSuccess(page, "blogSidebar");
    await page.goto("/blog/does-microneedling-work");

    await page.locator("#blog-name").fill(DUMMY_TEXT);
    await page.locator("#blog-email").fill(DUMMY_EMAIL);
    await page.locator("#blog-phone").fill(DUMMY_PHONE);
    await page.locator("#blog-time").selectOption({ index: 1 });
    await page.locator("#blog-method").selectOption({ index: 1 });
    await page.locator("#blog-enquiry").fill(DUMMY_TEXT);

    await page.getByRole("button", { name: "Request a Call Back" }).click();

    const status = page.getByRole("status");
    await expect(status).toContainText(FORMS.blogSidebar.successHeading);
    await expect(status).toContainText(FORMS.blogSidebar.successMessage);
  });
});
