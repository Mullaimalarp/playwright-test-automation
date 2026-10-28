import { expect, type Page } from '@playwright/test';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/products');

    await expect(
      this.page.getByText('All Products', { exact: true })
    ).toBeVisible();
  }

  async searchFor(productName: string): Promise<void> {
    await this.page.locator('#search_product').fill(productName);
    await this.page.locator('#submit_search').click();

    await expect(
      this.page.getByText('Searched Products', { exact: true })
    ).toBeVisible();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.page.getByText(productName, { exact: true }).first()
    ).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.page
      .locator('.product-image-wrapper')
      .filter({ hasText: productName })
      .first();

    await expect(productCard).toBeVisible();

    const addToCartButton = productCard
      .locator('a.add-to-cart')
      .first();

    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    await expect(
      this.page.getByText('Your product has been added to cart.')
    ).toBeVisible();
  }


  async continueShopping(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Continue Shopping' })
      .click();
  }

  async viewCart(): Promise<void> {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }
}
