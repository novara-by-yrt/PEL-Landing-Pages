import { defineConfig, devices } from "@playwright/test";

/**
 * Every spec under tests/forms/ intercepts both the reCAPTCHA script and the
 * /api/forms endpoint (see tests/forms/helpers.ts) — no test here ever sends
 * a real email or depends on Google's reCAPTCHA service being reachable.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
