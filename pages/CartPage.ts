import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/view_cart');
    await expect(this.page).toHaveURL(/view_cart/);
  }

  private cartRow(productName: string) {
    return this.page
      .locator('tr')
      .filter({ hasText: productName });
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.cartRow(productName)).toBeVisible();
  }

  async expectQuantity(
    productName: string,
    expectedQuantity: string
  ): Promise<void> {
    await expect(
      this.cartRow(productName).locator('.cart_quantity button')
    ).toHaveText(expectedQuantity);
  }

  async removeProduct(productName: string): Promise<void> {
    const row = this.cartRow(productName);

    await row.locator('.cart_quantity_delete').click();

    await expect(row).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page
      .getByText('Proceed To Checkout', { exact: true })
      .click();

    await expect(this.page).toHaveURL(/checkout/);
  }
}

