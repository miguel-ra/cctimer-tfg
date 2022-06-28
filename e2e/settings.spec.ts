import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Settings", () => {
  test("should keep selected language", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/en/);

    await page.locator("select").selectOption("es");

    await expect(page).toHaveURL(/.*\/es/);

    await page.goto("http://localhost:3000");

    await expect(page).toHaveURL(/.*\/es/);
  });
});
