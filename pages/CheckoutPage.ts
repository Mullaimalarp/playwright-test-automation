import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async expectAddressDetails(): Promise<void> {
    await expect(
      this.page.getByText('Address Details', { exact: true })
    ).toBeVisible();
  }

  async expectOrderProduct(productName: string): Promise<void> {
    await expect(
      this.page.getByText(productName, { exact: true })
    ).toBeVisible();
  }

  async enterOrderComment(comment: string): Promise<void> {
    await this.page
      .locator('textarea[name="message"]')
      .fill(comment);
  }

  async placeOrder(): Promise<void> {
    await this.page.getByRole('link', { name: 'Place Order' }).click();

    await expect(
      this.page.getByRole('heading', { name: 'Payment' })
    ).toBeVisible();
  }

  async enterPaymentDetails(): Promise<void> {
    await this.page.locator('[data-qa="name-on-card"]').fill('Playwright Tester');
    await this.page.locator('[data-qa="card-number"]').fill('4111111111111111');
    await this.page.locator('[data-qa="cvc"]').fill('123');
    await this.page.locator('[data-qa="expiry-month"]').fill('12');
    await this.page.locator('[data-qa="expiry-year"]').fill('2030');
  }

  async payAndConfirm(): Promise<void> {
    await this.page.locator('[data-qa="pay-button"]').click();

    await expect(
      this.page.getByText('Order Placed!', { exact: true })
    ).toBeVisible();
  }
}


