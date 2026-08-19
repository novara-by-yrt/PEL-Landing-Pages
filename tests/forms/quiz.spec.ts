import { test, expect, type Page } from "@playwright/test";
import { FORMS } from "@/lib/forms/definitions";
import { DUMMY_TEXT, DUMMY_EMAIL, DUMMY_PHONE, mockFormsApiSuccess, suppressOnLoadPopup } from "./helpers";

/** Every radio/checkbox step is scoped to its own fieldset (named by its
 *  legend) rather than picked by option label alone — every step's inputs
 *  stay mounted in the DOM (just hidden) so the same "Yes"/"No" labels exist
 *  on several steps at once. */
function questionGroup(page: Page, question: string | RegExp) {
  return page.getByRole("group", { name: question });
}

test.describe("Blepharoplasty Candidacy Quiz (/self-test-survey)", () => {
  test("steps through the wizard and shows a tailored success message", async ({ page }) => {
    await suppressOnLoadPopup(page);
    await mockFormsApiSuccess(page, "quiz");
    await page.goto("/self-test-survey");

    const form = page.locator("form");
    // Scoped to the form: an unscoped "Next" also substring-matches Next.js's
    // own "Open Next.js Dev Tools" button, which is injected outside it.
    const next = () => form.getByRole("button", { name: "Next", exact: true }).click();

    await page.getByRole("button", { name: "Start the quiz" }).click();

    await questionGroup(page, "Are you an existing customer of Perfect Eyes Limited?")
      .getByRole("radio", { name: "No" })
      .check();
    await next();

    await form.getByPlaceholder("Full Name").fill(DUMMY_TEXT);
    await next();

    await form.getByPlaceholder("Phone").fill(DUMMY_PHONE);
    await next();

    await form.getByPlaceholder("Email").fill(DUMMY_EMAIL);
    await next();

    await form.getByPlaceholder("Address").fill(DUMMY_TEXT);
    await next();

    await questionGroup(page, "Have you had an eyelid or eyebrow lift surgery before?")
      .getByRole("radio", { name: "No" })
      .check();
    await next();

    await questionGroup(
      page,
      "Have you had any filler around your eyes (upper or lower) in the last two years?"
    )
      .getByRole("radio", { name: "No" })
      .check();
    await next();

    await questionGroup(page, "Are you considering to undergo the procedure within the next 6 months?")
      .getByRole("radio", { name: "Yes" })
      .check();
    await next();

    await questionGroup(page, "The cost of Blepharoplasty starts from £5,000. Is this within your budget?")
      .getByRole("radio", { name: "Yes" })
      .check();
    await next();

    await questionGroup(page, "Why do you want to undergo Blepharoplasty?")
      .getByRole("checkbox", { name: "My eyes look tired" })
      .check();
    await next();

    await questionGroup(page, "Do you take any of the medicines mentioned below?")
      .getByRole("checkbox", { name: "No medicine" })
      .check();
    await next();

    await questionGroup(page, "Do you have any of these symptoms?")
      .getByRole("radio", { name: "None of Above" })
      .check();

    await page.getByRole("button", { name: "SUBMIT" }).click();

    await expect(page.getByRole("heading", { name: FORMS.quiz.successHeading })).toBeVisible();
    await expect(page.getByRole("status")).toContainText(FORMS.quiz.successMessage);
  });
});
