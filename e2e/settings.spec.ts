import { expect, test } from "@playwright/test";

import { baseUrl } from "./contants";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe("Settings", () => {
  test("should keep selected language", async ({ page }) => {
    await expect(page).toHaveURL(/.*\/en/);

    await page.locator("select").selectOption("es");

    await expect(page).toHaveURL(/.*\/es/);

    await page.goto(baseUrl);

    await expect(page).toHaveURL(/.*\/es/);
  });
});
