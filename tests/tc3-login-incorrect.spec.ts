import { test, expect } from '@playwright/test';

test('TC3: Login User with incorrect email and password', async ({ page }) => {
  test.setTimeout(60_000);

  // Step 2-3: Navigate and verify home page
  await page.goto('/');
  await expect(page).toHaveURL(/automationexercise\.com/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' }).first()).toBeVisible();

  // Step 4: Click 'Signup / Login'
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // Step 5: Verify 'Login to your account' is visible
  await expect(page.getByText('Login to your account')).toBeVisible();

  // Step 6: Enter incorrect email and password
  await page.locator('input[data-qa="login-email"]').fill('wrong@notreal.com');
  await page.locator('input[data-qa="login-password"]').fill('WrongPass999');

  // Step 7: Click 'Login' button
  await page.locator('button[data-qa="login-button"]').click();

  // Step 8: Verify error message is visible
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});
