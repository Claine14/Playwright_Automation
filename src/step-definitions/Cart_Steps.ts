import { Given, Then, When } from '@cucumber/cucumber';
import { CucumberWorld } from './world/CucumberWorld';

Given('I am on the Cart page', async function (this: CucumberWorld) {
  await this.pages.cartPage.open();
});

Then('I should see the empty cart message {string}', async function (this: CucumberWorld, message: string) {
  await this.pages.cartPage.verifyEmptyCartMessage(message);
});

When('I click Continue Shopping from the empty cart', async function (this: CucumberWorld) {
  await this.pages.cartPage.clickContinueShopping();
});

Then(
  'I should see {string} in the cart with price {string}',
  async function (this: CucumberWorld, productName: string, price: string) {
    await this.pages.cartPage.verifyItemInCart(productName, price);
  }
);

When(
  'I update the quantity of {string} to {int}',
  async function (this: CucumberWorld, productName: string, quantity: number) {
    await this.pages.cartPage.updateItemQuantity(productName, quantity);
  }
);

Then('the cart subtotal should match the expected total of {string}', async function (this: CucumberWorld, total: string) {
  await this.pages.cartPage.verifySubtotal(total);
});

When('I remove {string} from the cart', async function (this: CucumberWorld, productName: string) {
  await this.pages.cartPage.removeItem(productName);
});

When('I proceed to checkout from the cart', async function (this: CucumberWorld) {
  await this.pages.cartPage.proceedToCheckout();
});
