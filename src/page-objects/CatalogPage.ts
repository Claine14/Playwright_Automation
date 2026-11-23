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
    await expect(cardLink).toBeVisible();
    // On Sauce Demo's Shopify theme, the "Sold Out" badge is a sibling element inside the parent grid wrapper
    const productWrapper = cardLink.locator('..');
    await expect(productWrapper).toContainText(badgeText);
  }
}
