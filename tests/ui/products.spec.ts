import { test } from '../../fixtures/test-fixtures';

test.describe('Products', () => {
  test('search for a product', async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.searchFor('Blue Top');
    await productsPage.expectProductVisible('Blue Top');
  });

  test('search returns matching T-shirt product', async ({
    productsPage
  }) => {
    await productsPage.goto();
    await productsPage.searchFor('Tshirt');
    await productsPage.expectProductVisible('Men Tshirt');
  });
});

