import { Given, Then, When } from '@cucumber/cucumber';
import { CucumberWorld } from './world/CucumberWorld';

Given('I am on the product detail page for {string}', async function (this: CucumberWorld, productHandle: string) {
  await this.pages.productDetailPage.openByHandle(productHandle);
});

Then(
  'I should see the product title {string} and price {string}',
  async function (this: CucumberWorld, title: string, price: string) {
    await this.pages.productDetailPage.verifyProductDetails(title, price);
  }
);

When('I click the Add to Cart button', async function (this: CucumberWorld) {
  await this.pages.productDetailPage.clickAddToCart();
});

Then('the Add to Cart button should be unavailable or marked sold out', async function (this: CucumberWorld) {
  await this.pages.productDetailPage.verifySoldOutState();
});
