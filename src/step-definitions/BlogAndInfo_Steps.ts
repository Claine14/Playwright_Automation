import { Given, Then } from '@cucumber/cucumber';
import { CucumberWorld } from './world/CucumberWorld';

Given('I am on the Blog page', async function (this: CucumberWorld) {
  await this.pages.blogAndInfoPage.openBlog();
});

Then(
  'I should see the blog post {string} published on {string}',
  async function (this: CucumberWorld, title: string, publishedDate: string) {
    await this.pages.blogAndInfoPage.verifyBlogPost(title, publishedDate);
  }
);

Given('I am on the About Us page', async function (this: CucumberWorld) {
  await this.pages.blogAndInfoPage.openAboutUs();
});

Then('I should see the Sauce Demo store description on the About Us page', async function (this: CucumberWorld) {
  await this.pages.blogAndInfoPage.verifyAboutUsDescription();
});
