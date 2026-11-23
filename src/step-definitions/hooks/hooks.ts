import { After, Before, Status } from '@cucumber/cucumber';
import '../../utils/cucumber-timeout';
import { closeBrowserSession, launchBrowserSession } from './browserContextFixture';
import { CucumberWorld } from '../world/CucumberWorld';

Before(async function (this: CucumberWorld) {
  const session = await launchBrowserSession();
  this.browser = session.browser;
  this.context = session.context;
  this.initPages(session.page);
});

After(async function (this: CucumberWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }

  await closeBrowserSession({
    browser: this.browser,
    context: this.context,
    page: this.page
  });
});
