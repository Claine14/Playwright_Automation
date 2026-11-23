import { expect, Page } from '@playwright/test';
import { ListingBasePage } from './base/ListingBasePage';

export class HomePage extends ListingBasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async verifyTagline(expectedTagline: string): Promise<void> {
    await expect(this.storeTagline).toHaveText(expectedTagline);
  }

  async getFeaturedProductCount(): Promise<number> {
    const urls = await this.getUniqueProductUrls();
    return urls.length;
  }
}
