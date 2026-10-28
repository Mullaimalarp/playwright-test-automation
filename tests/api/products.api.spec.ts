import { test, expect } from '@playwright/test';

test.describe('Products API', () => {
  test('GET all products', async ({ request }) => {
    const response = await request.get('/api/productsList');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    expect(body.products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(String),
        brand: expect.any(String)
      })
    );
  });

  test('POST to products list returns method-not-supported response', async ({
    request
  }) => {
    const response = await request.post('/api/productsList');
    const body = await response.json();

    expect(body.responseCode).toBe(405);
    expect(body.message).toContain(
      'This request method is not supported'
    );
  });
});

