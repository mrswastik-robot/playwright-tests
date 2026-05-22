import { test, expect, type Page } from '@playwright/test';

let testEmail: string;
const testPassword = 'Test@12345';
const testUserName = 'Bug Zero Tester';

async function registerAccount(page: Page) {
  testEmail = `testuser_${Date.now()}@testmail.com`;

  await page.goto('/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('input[data-qa="signup-name"]').fill(testUserName);
  await page.locator('input[data-qa="signup-email"]').fill(testEmail);
  await page.locator('button[data-qa="signup-button"]').click();

  await page.locator('#id_gender1').check();
  await page.locator('input[data-qa="password"]').fill(testPassword);
  await page.locator('select[data-qa="days"]').selectOption('10');
  await page.locator('select[data-qa="months"]').selectOption('5');
  await page.locator('select[data-qa="years"]').selectOption('1995');
  await page.locator('input[data-qa="first_name"]').fill('Bug');
  await page.locator('input[data-qa="last_name"]').fill('Zero');
  await page.locator('input[data-qa="address"]').fill('123 Test Street');
  await page.locator('select[data-qa="country"]').selectOption('United States');
  await page.locator('input[data-qa="state"]').fill('California');
  await page.locator('input[data-qa="city"]').fill('San Francisco');
  await page.locator('input[data-qa="zipcode"]').fill('94105');
  await page.locator('input[data-qa="mobile_number"]').fill('9876543210');
  await page.locator('button[data-qa="create-account"]').click();

  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();

  // Log out so the test starts from a clean logged-out state
  await page.getByRole('link', { name: 'Logout' }).click();
}

async function deleteAccount(page: Page) {
  await page.goto('/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('input[data-qa="login-email"]').fill(testEmail);
  await page.locator('input[data-qa="login-password"]').fill(testPassword);
  await page.locator('button[data-qa="login-button"]').click();
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
}

test.describe('TC4: Logout User', () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await registerAccount(page);
    await page.close();
  });

  test.afterAll(async ({ browser }) => {
    const page = await browser.newPage();
    await deleteAccount(page);
    await page.close();
  });

  test('should logout and land on the login page', async ({ page }) => {
    test.setTimeout(60_000);

    // Step 2-3: Navigate and verify home page
    await page.goto('/');
    await expect(page).toHaveURL(/automationexercise\.com/);
    await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' }).first()).toBeVisible();

    // Step 4: Click 'Signup / Login'
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Step 5: Verify 'Login to your account' is visible
    await expect(page.getByText('Login to your account')).toBeVisible();

    // Step 6: Enter correct email and password
    await page.locator('input[data-qa="login-email"]').fill(testEmail);
    await page.locator('input[data-qa="login-password"]').fill(testPassword);

    // Step 7: Click 'Login' button
    await page.locator('button[data-qa="login-button"]').click();

    // Step 8: Verify 'Logged in as username' is visible
    await expect(page.locator('li').filter({ hasText: `Logged in as ${testUserName}` })).toBeVisible();

    // Step 9: Click 'Logout' button
    await page.getByRole('link', { name: 'Logout' }).click();

    // Step 10: Verify user is navigated to login page
    await expect(page.getByText('Login to your account')).toBeVisible();
  });
});
