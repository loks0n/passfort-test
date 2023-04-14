import { test, expect } from '@playwright/test';

test('has heading', async ({ page }) => {
  await page.goto('/');
  const mainHeading = page.getByRole('heading', { name: 'All Pages' });
  await expect(mainHeading).toBeVisible();
});

test('has pages links', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('page-link-list').waitFor();

  const pageLinks = page.getByTestId('page-link');
  const pageLinksCount = await pageLinks.count();

  await expect(pageLinksCount).toBeGreaterThan(0);
});

test('can navigate to page detail route', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('page-link-list').waitFor();

  const pageLinks = page.getByTestId('page-link');
  const firstPageLink = await pageLinks.first();

  await firstPageLink.click();
  const pageDetailHeading = page.getByTestId('page-detail-heading');

  await pageDetailHeading.waitFor();
  await expect(pageDetailHeading).toBeVisible();
});
