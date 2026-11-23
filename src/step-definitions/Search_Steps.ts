import { Given, Then, When } from '@cucumber/cucumber';
import { CucumberWorld } from './world/CucumberWorld';

Given('I am on the Search page', async function (this: CucumberWorld) {
  await this.pages.searchPage.open();
});

Then('I should see the initial search message {string}', async function (this: CucumberWorld, message: string) {
  await this.pages.searchPage.verifyInitialMessage(message);
});

When('I search for {string}', async function (this: CucumberWorld, query: string) {
  await this.pages.searchPage.searchFor(query);
});

Then('I should see search results containing {string}', async function (this: CucumberWorld, productName: string) {
  await this.pages.searchPage.verifySearchResultContains(productName);
});

Then('I should see no matching products for {string}', async function (this: CucumberWorld, query: string) {
  await this.pages.searchPage.verifyNoResultsFor(query);
});
