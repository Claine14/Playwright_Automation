import { Then, When } from '@cucumber/cucumber';
import { CucumberWorld } from './world/CucumberWorld';

When('I click the {string} link in the main menu', async function (this: CucumberWorld, linkText: string) {
  await this.pages.basePage.clickSideMenuLink(linkText);
});

When('I click the {string} link in the top header', async function (this: CucumberWorld, linkText: string) {
  await this.pages.basePage.clickHeaderLink(linkText);
});

When('I click the {string} link in the footer', async function (this: CucumberWorld, linkText: string) {
  await this.pages.basePage.clickFooterLink(linkText);
});

Then('I should see the store tagline {string}', async function (this: CucumberWorld, tagline: string) {
  await this.pages.homePage.verifyTagline(tagline);
});

Then('the header cart count should be {string}', async function (this: CucumberWorld, expectedCount: string) {
  await this.pages.basePage.expectCartCount(expectedCount);
});

Then('I should be navigated to a URL containing {string}', async function (this: CucumberWorld, urlFragment: string) {
  await this.pages.basePage.expectUrlContains(urlFragment);
});

Then('I should see the page heading {string}', async function (this: CucumberWorld, headingText: string) {
  await this.pages.basePage.expectHeadingText(headingText);
});
