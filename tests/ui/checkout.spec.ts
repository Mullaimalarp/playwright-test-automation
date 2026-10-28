import { test, expect, type APIRequestContext } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { createTestUser, type TestUser } from '../../test-data/users';

async function createAccount(
  request: APIRequestContext,
  user: TestUser
): Promise<void> {
  const response = await request.post('/api/createAccount', {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address1,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipCode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber
    }
  });

  const body = await response.json();
  expect(body.responseCode).toBe(201);
}

async function deleteAccount(
  request: APIRequestContext,
  user: TestUser
): Promise<void> {
  await request.delete('/api/deleteAccount', {
    form: {
      email: user.email,
      password: user.password
    }
  });
}

test('logged-in user can complete checkout', async ({
  page,
  request
}, testInfo) => {
  testInfo.setTimeout(90_000);

  const user = createTestUser();

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await createAccount(request, user);

  try {
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await loginPage.expectLoggedIn(user.name);

    await productsPage.goto();
    await productsPage.addProductToCart('Blue Top');
    await productsPage.viewCart();

    await cartPage.expectProductInCart('Blue Top');
    await cartPage.proceedToCheckout();

    await checkoutPage.expectAddressDetails();
    await checkoutPage.expectOrderProduct('Blue Top');
    await checkoutPage.enterOrderComment(
      'Playwright portfolio checkout test'
    );

    await checkoutPage.placeOrder();
    await checkoutPage.enterPaymentDetails();
    await checkoutPage.payAndConfirm();
  } finally {
    await deleteAccount(request, user);
  }
});
