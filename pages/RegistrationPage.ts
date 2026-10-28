
import { expect, type Page } from '@playwright/test';
import type { TestUser } from '../test-data/users';

export class RegistrationPage {
  constructor(private readonly page: Page) {}

  async expectAccountInformationPage(): Promise<void> {
    await expect(
      this.page.getByText('Enter Account Information', { exact: false })
    ).toBeVisible();
  }

  async completeRegistration(user: TestUser): Promise<void> {
    if (user.title === 'Mr') {
      await this.page.locator('#id_gender1').check();
    } else {
      await this.page.locator('#id_gender2').check();
    }

    await this.page.locator('#password').fill(user.password);
    await this.page.locator('#days').selectOption(user.birthDay);
    await this.page.locator('#months').selectOption(user.birthMonth);
    await this.page.locator('#years').selectOption(user.birthYear);

    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();

    await this.page.locator('#first_name').fill(user.firstName);
    await this.page.locator('#last_name').fill(user.lastName);
    await this.page.locator('#company').fill(user.company);
    await this.page.locator('#address1').fill(user.address1);
    await this.page.locator('#address2').fill(user.address2);
    await this.page.locator('#country').selectOption(user.country);
    await this.page.locator('#state').fill(user.state);
    await this.page.locator('#city').fill(user.city);
    await this.page.locator('#zipcode').fill(user.zipCode);
    await this.page.locator('#mobile_number').fill(user.mobileNumber);

    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }

  async expectAccountCreated(): Promise<void> {
    await expect(
      this.page.getByText('Account Created!', { exact: true })
    ).toBeVisible();
  }

  async continueToApplication(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}

