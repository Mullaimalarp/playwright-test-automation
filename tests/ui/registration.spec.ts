import { test, expect } from '../../fixtures/test-fixtures';
import { createTestUser } from '../../test-data/users';

test.describe('User registration', () => {
  test('register a new user successfully', async ({
    page,
    loginPage,
    registrationPage,
    request
  }) => {
    const user = createTestUser();

    try {
      await loginPage.goto();
      await loginPage.signup(user.name, user.email);

      await registrationPage.expectAccountInformationPage();
      await registrationPage.completeRegistration(user);
      await registrationPage.expectAccountCreated();
      await registrationPage.continueToApplication();

      await expect(
        page.getByText(`Logged in as ${user.name}`)
      ).toBeVisible();
    } finally {
      await request.delete(
        'https://automationexercise.com/api/deleteAccount',
        {
          form: {
            email: user.email,
            password: user.password
          }
        }
      );
    }
  });
});
