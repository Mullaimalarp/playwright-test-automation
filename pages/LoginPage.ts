import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/login');
    await expect(
      this.page.getByRole('heading', { name: 'Login to your account' })
    ).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    const loginForm = this.page
      .locator('form')
      .filter({ has: this.page.getByRole('button', { name: 'Login' }) });

    await loginForm.getByPlaceholder('Email Address').fill(email);
    await loginForm.getByPlaceholder('Password').fill(password);
    await loginForm.getByRole('button', { name: 'Login' }).click();
  }

  async signup(name: string, email: string): Promise<void> {
    const signupForm = this.page
      .locator('form')
      .filter({ has: this.page.getByRole('button', { name: 'Signup' }) });

    await signupForm.getByPlaceholder('Name').fill(name);
    await signupForm.getByPlaceholder('Email Address').fill(email);
    await signupForm.getByRole('button', { name: 'Signup' }).click();
  }

  async expectLoginError(): Promise<void> {
    await expect(
      this.page.getByText('Your email or password is incorrect!')
    ).toBeVisible();
  }

  async expectExistingEmailError(): Promise<void> {
    await expect(
      this.page.getByText('Email Address already exist!')
    ).toBeVisible();
  }

  async expectLoggedIn(name: string): Promise<void> {
    await expect(
      this.page.getByText(`Logged in as ${name}`)
    ).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await expect(this.page).toHaveURL(/\/login/);
  }

  async deleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();

    await expect(
      this.page.getByText('Account Deleted!', { exact: true })
    ).toBeVisible();
  }
}
