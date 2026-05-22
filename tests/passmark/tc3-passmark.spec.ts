import { test, expect } from '@playwright/test';
import { runSteps, configure } from 'passmark';

// Tell Passmark to route all AI calls through OpenRouter.
// OPENROUTER_API_KEY is read automatically from the .env file.
configure({
  ai: {
    gateway: 'openrouter',
  },
});

test('TC3 (Passmark): Login User with incorrect email and password', async ({ page }) => {
  // AI-driven tests need extra time — each step involves a model call
  test.setTimeout(120_000);

  await runSteps({
    page,
    userFlow: 'Login with incorrect email and password',
    steps: [
      { description: 'Navigate to https://automationexercise.com' },
      { description: 'Verify the home page is visible' },
      { description: 'Click on the Signup / Login link in the navigation' },
      { description: 'Verify the Login to your account section is visible' },
      { description: 'Enter incorrect email address in the email field', data: { value: 'wrong@notreal.com' } },
      { description: 'Enter incorrect password in the password field', data: { value: 'WrongPass999' } },
      { description: 'Click the Login button' },
    ],
    assertions: [
      { assertion: 'The error message "Your email or password is incorrect!" is visible on the page' },
    ],
    test,
    expect,
  });
});
