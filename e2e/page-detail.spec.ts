import { test, expect } from '@playwright/test';

test('has page detail heading', async ({ page }) => {
  await page.goto('/page/hello');
  const pageDetailHeading = page.getByTestId('page-detail-heading');

  await pageDetailHeading.waitFor();
  await expect(pageDetailHeading).toBeVisible();
});

test('can edit page', async ({ page }) => {
  await page.goto('/page/hello');
  await page.getByTestId('page-detail-heading').waitFor();

  const editButton = page.getByRole('button', { name: 'Edit' });
  await editButton.click();

  const editPageInput = page.getByRole('textbox');
  const randomText = Math.random().toString(36).substring(7);
  await editPageInput.fill(randomText);

  const saveButton = page.getByRole('button', { name: 'Save' });
  await saveButton.click();

  const editedText = page.getByText(randomText);
  await editedText.waitFor();
  await expect(editedText).toBeVisible();
});
