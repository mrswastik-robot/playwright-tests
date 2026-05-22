import { test, expect } from '@playwright/test';

test('TC1: Register User', async ({ page }) => {
  test.setTimeout(60_000);
  // Generate a unique email so the test never hits "already exists"
  const uniqueEmail = `testuser_${Date.now()}@testmail.com`;
  const userName = 'Bug Zero Tester';

  // Step 2-3: Navigate and verify home page
  await page.goto('/');
  await expect(page).toHaveURL(/automationexercise\.com/);
  await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' }).first()).toBeVisible();

  // Step 4: Click 'Signup / Login'
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // Step 5: Verify 'New User Signup!' is visible
  await expect(page.getByText('New User Signup!')).toBeVisible();

  // Step 6: Enter name and email address
  await page.locator('input[data-qa="signup-name"]').fill(userName);
  await page.locator('input[data-qa="signup-email"]').fill(uniqueEmail);

  // Step 7: Click 'Signup' button
  await page.locator('button[data-qa="signup-button"]').click();

  // Step 8: Verify 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  // Step 9: Fill Title, Name (pre-filled), Password, Date of birth
  await page.locator('#id_gender1').check(); // Select 'Mr'
  await page.locator('input[data-qa="password"]').fill('Test@12345');
  await page.locator('select[data-qa="days"]').selectOption('10');
  await page.locator('select[data-qa="months"]').selectOption('5');
  await page.locator('select[data-qa="years"]').selectOption('1995');

  // Step 10: Select 'Sign up for our newsletter!'
  await page.locator('#newsletter').check();

  // Step 11: Select 'Receive special offers from our partners!'
  await page.locator('#optin').check();

  // Step 12: Fill address details
  await page.locator('input[data-qa="first_name"]').fill('Bug');
  await page.locator('input[data-qa="last_name"]').fill('Zero');
  await page.locator('input[data-qa="company"]').fill('Bug0 Inc');
  await page.locator('input[data-qa="address"]').fill('123 Test Street');
  await page.locator('input[data-qa="address2"]').fill('Suite 456');
  await page.locator('select[data-qa="country"]').selectOption('United States');
  await page.locator('input[data-qa="state"]').fill('California');
  await page.locator('input[data-qa="city"]').fill('San Francisco');
  await page.locator('input[data-qa="zipcode"]').fill('94105');
  await page.locator('input[data-qa="mobile_number"]').fill('9876543210');

  // Step 13: Click 'Create Account'
  await page.locator('button[data-qa="create-account"]').click();

  // Step 14: Verify 'ACCOUNT CREATED!' is visible
  await expect(page.getByText('Account Created!')).toBeVisible();

  // Step 15: Click 'Continue'
  await page.locator('a[data-qa="continue-button"]').click();

  // Step 16: Verify 'Logged in as username' is visible
  await expect(page.locator('li').filter({ hasText: `Logged in as ${userName}` })).toBeVisible();

  // Step 17: Click 'Delete Account'
  await page.getByRole('link', { name: 'Delete Account' }).click();

  // Step 18: Verify 'ACCOUNT DELETED!' and click 'Continue'
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
});
