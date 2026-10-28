import { test, expect } from '@playwright/test';
import { createTestUser } from '../../test-data/users';

test.describe('User account API', () => {
  test('create, verify and delete a user account', async ({
    request
  }) => {
    const user = createTestUser();

    const createResponse = await request.post('/api/createAccount', {
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

    const createBody = await createResponse.json();

    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');

    try {
      const loginResponse = await request.post('/api/verifyLogin', {
        form: {
          email: user.email,
          password: user.password
        }
      });

      const loginBody = await loginResponse.json();

      expect(loginBody.responseCode).toBe(200);
      expect(loginBody.message).toBe('User exists!');
    } finally {
      const deleteResponse = await request.delete(
        '/api/deleteAccount',
        {
          form: {
            email: user.email,
            password: user.password
          }
        }
      );

      const deleteBody = await deleteResponse.json();

      expect(deleteBody.responseCode).toBe(200);
      expect(deleteBody.message).toBe('Account deleted!');
    }
  });

  test('invalid login returns user-not-found response', async ({
    request
  }) => {
    const response = await request.post('/api/verifyLogin', {
      form: {
        email: `missing.${Date.now()}@example.com`,
        password: 'WrongPassword'
      }
    });

    const body = await response.json();

    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('login request without email returns validation error', async ({
    request
  }) => {
    const response = await request.post('/api/verifyLogin', {
      form: {
        password: 'Test@12345'
      }
    });

    const body = await response.json();

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain(
      'email or password parameter is missing'
    );
  });
});

