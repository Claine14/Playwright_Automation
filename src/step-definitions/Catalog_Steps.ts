import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CucumberWorld } from './world/CucumberWorld';

Given('I am on the Catalog page', async function (this: CucumberWorld) {
  await this.pages.catalogPage.open();
});

Then('I should see {int} products listed in the catalog', async function (this: CucumberWorld, expectedCount: number) {
  const count = await this.pages.catalogPage.getCatalogProductCount();
  expect(count).toBe(expectedCount);
});

Then(
  'the product {string} should be listed with price {string}',
  async function (this: CucumberWorld, productName: string, price: string) {
    await this.pages.catalogPage.verifyProductListedWithPrice(productName, price);
  }
);

Then(
  'the product {string} should display a {string} badge',
  async function (this: CucumberWorld, productName: string, badge: string) {
    await this.pages.catalogPage.verifySoldOutBadge(productName, badge);
  }
);

When('I open the product {string} from the catalog', async function (this: CucumberWorld, productName: string) {
  await this.pages.catalogPage.openProductByName(productName);
});
