import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { parseGbpPrice } from '../../utils/price-utils';

export class ListingBasePage extends BasePage {
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards = page.locator('section a[href*="/products/"], main a[href*="/products/"], div a[href*="/products/"]');
  }

  getProductCardByTitle(title: string): Locator {
    return this.page
      .locator('a[href*="/products/"]')
      .filter({ hasText: title })
      .first();
  }

  async getUniqueProductUrls(): Promise<string[]> {
    const hrefs = await this.page.locator('a[href*="/products/"]').evaluateAll((anchors) =>
      Array.from(
        new Set(
          anchors
            .map((a) => a.getAttribute('href') || '')
            .filter((href) => href.includes('/products/'))
        )
      )
    );
    return hrefs;
  }

  async openProductByName(productName: string): Promise<void> {
    const link = this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first();
    await link.click();
  }

  async verifyProductListedWithPrice(productName: string, expectedPrice: string): Promise<void> {
    const card = this.getProductCardByTitle(productName);
    await expect(card).toBeVisible();
    const cardText = await card.innerText();
    expect(cardText).toContain(productName);
    expect(parseGbpPrice(cardText)).toBe(parseGbpPrice(expectedPrice));
  }
}
