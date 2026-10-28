import { test, expect, type APIRequestContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { createTestUser, type TestUser } from '../../test-data/users';

async function createAccount(
  request: APIRequestContext,
  user: TestUser
): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipCode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber
    }
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.responseCode).toBe(201);
}

async function deleteAccount(
  request: APIRequestContext,
  user: TestUser
): Promise<void> {
  await request.delete('/api/deleteAccount', {
    form: {
      email: user.email,
      password: user.password
    }
  });
}

test.describe('Login', () => {
  test('login with valid credentials and logout', async ({
    page,
    request
  }) => {
    const user = createTestUser();
    const loginPage = new LoginPage(page);

    await createAccount(request, user);

    try {
      await loginPage.goto();
      await loginPage.login(user.email, user.password);
      await loginPage.expectLoggedIn(user.name);
      await loginPage.logout();

      await expect(
        page.getByRole('heading', { name: 'Login to your account' })
      ).toBeVisible();
    } finally {
      await deleteAccount(request, user);
    }
  });

  test('show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      `invalid.${Date.now()}@example.com`,
      'WrongPassword123'
    );

    await loginPage.expectLoginError();
  });
});
