import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://staging-halalmaxcert.indonesiancloud.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Selamat datang di HalalMax/);
});