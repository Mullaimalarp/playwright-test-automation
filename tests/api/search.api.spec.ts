import { test, expect } from '@playwright/test';

test.describe('Product search API', () => {
  test('search for a product', async ({ request }) => {
    const response = await request.post('/api/searchProduct', {
      form: {
        search_product: 'top'
      }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    for (const product of body.products) {
      expect(product).toHaveProperty('name');
      expect(typeof product.name).toBe('string');
    }
  });

  test('missing search parameter returns validation error', async ({
    request
  }) => {
    const response = await request.post('/api/searchProduct');
    const body = await response.json();

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain(
      'search_product parameter is missing'
    );
  });
});


