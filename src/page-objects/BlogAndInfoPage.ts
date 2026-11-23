import { expect, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class BlogAndInfoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openBlog(): Promise<void> {
    await this.navigate('/blogs/news');
  }

  async openAboutUs(): Promise<void> {
    await this.navigate('/pages/about-us');
  }

  async verifyBlogPost(title: string, publishedDate: string): Promise<void> {
    await expect(this.page.locator('body')).toContainText(title);
    await expect(this.page.locator('body')).toContainText(publishedDate);
  }

  async verifyAboutUsDescription(): Promise<void> {
    await expect(this.page.locator('body')).toContainText(
      'This is a demo site created for Sauce, an awesome new way to make your Shopify site social.'
    );
  }
}
