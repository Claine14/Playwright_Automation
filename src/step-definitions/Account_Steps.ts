import { Given, Then, When } from '@cucumber/cucumber';
import { CucumberWorld } from './world/CucumberWorld';

Given('I am on the Login page', async function (this: CucumberWorld) {
  await this.pages.accountPage.openLogin();
});

Given('I am on the Create Account page', async function (this: CucumberWorld) {
  await this.pages.accountPage.openRegister();
});

When(
  'I submit the login form with email {string} and password {string}',
  async function (this: CucumberWorld, email: string, password: string) {
    await this.pages.accountPage.submitLogin(email, password);
  }
);

Then('I should see an authentication error or stay on the login page', async function (this: CucumberWorld) {
  await this.pages.accountPage.verifyLoginRejected();
});

Then('I should see all customer registration fields', async function (this: CucumberWorld) {
  await this.pages.accountPage.verifyRegistrationFieldsVisible();
});

When('I click the Create account link from the login page', async function (this: CucumberWorld) {
  await this.pages.accountPage.createAccountLink.click();
});
