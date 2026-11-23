import { Given } from '@cucumber/cucumber';
import { CucumberWorld } from './world/CucumberWorld';

Given('I am on the Sauce Demo homepage', async function (this: CucumberWorld) {
  await this.pages.landingPage.openStorefront();
});
