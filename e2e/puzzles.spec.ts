import { expect, Page, test } from "@playwright/test";

import { baseUrl } from "./contants";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page.locator('[data-test-id="scramble-text"]')).not.toBeEmpty();
});

test.describe("Puzzles", () => {
  test("should keep puzzle times when refreshing", async ({ page }) => {
    const time = await addTime(page);

    await expect(page.locator(`[data-test-id="times"] >> text=${time}`)).toBeVisible();

    await page.reload();

    await expect(page.locator(`[data-test-id="times"] >> text=${time}`)).toBeVisible();
  });

  test("should add times and show stats", async ({ page }) => {
    const times = await addTimes(page, 5);

    expect(await page.locator('[data-test-id="times"] >> button').count()).toBe(5);

    const statsSingle = await page.waitForSelector("*css=tr >> text=Single");

    const bestTime =
      times[
        times.map(Number).reduce((lowestIndex, element, index, array) => {
          return element < array[lowestIndex] ? index : lowestIndex;
        }, 0)
      ];
    const statLastTime = await (await statsSingle.$(":nth-child(2)"))?.textContent();
    const statBestTime = await (await statsSingle.$(":nth-child(3)"))?.textContent();

    expect(times[times.length - 1]).toBe(statLastTime);
    expect(bestTime).toBe(statBestTime);
  });

  test("should show only the times of the current puzzle", async ({ page }) => {
    const time1 = await addTime(page, 500);
    await expect(page.locator(`[data-test-id="times"] >> text=${time1}`)).toBeVisible();

    // Click [aria-label="Add puzzle"]
    await page.locator('[aria-label="Add puzzle"]').click();
    await expect(page).toHaveURL(`${baseUrl}en#modal`);

    // Click button:has-text("2x2 Cube")
    await page.locator('button:has-text("2x2 Cube")').click();
    await expect(page.locator(`[data-test-id="times"] >> text=${time1}`)).not.toBeVisible();
    const time2 = await addTime(page, 1500);
    await expect(page.locator(`[data-test-id="times"] >> text=${time2}`)).toBeVisible();

    // Click [aria-label="\33 x3 Cube"]
    await page.locator('[aria-label="\\33 x3 Cube"]').click();
    await expect(page.locator(`[data-test-id="times"] >> text=${time1}`)).toBeVisible();
    await expect(page.locator(`[data-test-id="times"] >> text=${time2}`)).not.toBeVisible();
  });
});

async function addTime(page: Page, delayMs = 1000) {
  const stopwatchPressable = page.locator('[data-test-id="stopwatch-pressable"]');
  await stopwatchPressable.click();

  await delay(delayMs);

  await stopwatchPressable.click();

  const timeText = (await page.locator('[data-test-id="stopwatch-time"]').textContent()) as string;
  expect(timeText).toBeDefined();

  return timeText;
}

async function addTimes(page: Page, nth: number) {
  const times = [];

  for (let index = 0; index < nth; index++) {
    times.push(await addTime(page));
  }

  return times;
}
