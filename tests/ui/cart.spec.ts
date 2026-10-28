import { test } from '../../fixtures/test-fixtures';

test.describe('Shopping cart', () => {
  test('add a product to the cart', async ({
    productsPage,
    cartPage
  }) => {
    await productsPage.goto();
    await productsPage.addProductToCart('Blue Top');
    await productsPage.viewCart();

    await cartPage.expectProductInCart('Blue Top');
    await cartPage.expectQuantity('Blue Top', '1');
  });

  test('remove a product from the cart', async ({
    productsPage,
    cartPage
  }) => {
    await productsPage.goto();
    await productsPage.addProductToCart('Blue Top');
    await productsPage.viewCart();

    await cartPage.expectProductInCart('Blue Top');
    await cartPage.removeProduct('Blue Top');
  });
});
