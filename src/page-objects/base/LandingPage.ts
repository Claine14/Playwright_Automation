import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openStorefront(): Promise<void> {
    await this.navigate('/');
  }
}
