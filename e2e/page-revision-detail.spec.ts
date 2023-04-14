import { test, expect } from '@playwright/test';

test('has page detail heading', async ({ page }) => {
  await page.goto('/page/hello/0');
  const pageDetailHeading = page.getByTestId('page-detail-heading');

  await pageDetailHeading.waitFor();
  await expect(pageDetailHeading).toBeVisible();
});

test('has page revisions', async ({ page }) => {
  await page.goto('/page/hello/0');
  await page.getByTestId('page-revision-list').waitFor();

  const pageLinks = page.getByTestId('page-revision-link');
  const pageLinksCount = await pageLinks.count();

  await expect(pageLinksCount).toBeGreaterThan(0);
});

test('can go to another revison', async ({ page }) => {
  await page.goto('/page/hello/0');
  await page.getByTestId('page-revision-list').waitFor();

  const pageLinks = page.getByTestId('page-revision-link');
  const firstPageLink = await pageLinks.first();

  await firstPageLink.click();
  const pageDetailHeading = page.getByTestId('page-detail-heading');

  await pageDetailHeading.waitFor();
  await expect(pageDetailHeading).toBeVisible();
});
