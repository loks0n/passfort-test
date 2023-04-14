import { test, expect } from '@playwright/test';

test('exists', async ({ page }) => {
  await page.goto('/');
  await expect(page).toBeTruthy();
});
