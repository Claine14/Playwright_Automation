import { expect, Page } from '@playwright/test';
import { ListingBasePage } from './base/ListingBasePage';

export class CatalogPage extends ListingBasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigate('/collections/all');
  }

  async getCatalogProductCount(): Promise<number> {
    const urls = await this.getUniqueProductUrls();
    return urls.length;
  }

  async verifySoldOutBadge(productName: string, badgeText: string): Promise<void> {
    const cardLink = this.getProductCardByTitle(productName);
    // Badge "Sold Out" adalah div.sold-out di dalam link kartu produk
    await expect(cardLink.locator('.sold-out')).toHaveText(badgeText);
  }
}
