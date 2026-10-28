export interface TestUser {
    name: string;
    email: string;
    password: string;
    title: 'Mr' | 'Mrs';
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobileNumber: string;
  }
  
  export function createTestUser(): TestUser {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  
    return {
      name: 'Playwright Tester',
      email: `playwright.${uniqueId}@example.com`,
      password: 'Test@12345',
      title: 'Mrs',
      birthDay: '10',
      birthMonth: '5',
      birthYear: '1990',
      firstName: 'Playwright',
      lastName: 'Tester',
      company: 'QA Portfolio',
      address1: '10 Test Street',
      address2: 'Automation Suburb',
      country: 'India',
      state: 'Victoria',
      city: 'Melbourne',
      zipCode: '3000',
      mobileNumber: '0400000000'
    };
  }
