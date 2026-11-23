import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CucumberWorld } from './world/CucumberWorld';

Then('I should see {int} featured products on the homepage', async function (this: CucumberWorld, expectedCount: number) {
  const count = await this.pages.homePage.getFeaturedProductCount();
  expect(count).toBe(expectedCount);
});

Then(
  'the featured products should include {string} priced at {string}',
  async function (this: CucumberWorld, productName: string, price: string) {
    await this.pages.homePage.verifyProductListedWithPrice(productName, price);
  }
);

When('I select the featured product {string}', async function (this: CucumberWorld, productName: string) {
  await this.pages.homePage.openProductByName(productName);
});
