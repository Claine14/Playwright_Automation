import { expect, Locator, Page } from '@playwright/test';
import { ListingBasePage } from './base/ListingBasePage';

export class SearchPage extends ListingBasePage {
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly searchStatusMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('form[action="/search"] input[name="q"], input[type="search"]').first();
    this.searchSubmitButton = page.locator('form[action="/search"] input[type="submit"], form[action="/search"] button[type="submit"]').first();
    this.searchStatusMessage = page.locator('section, main, div').filter({ hasText: /No search performed|did not yield any results/i }).first();
  }

  async open(): Promise<void> {
    await this.navigate('/search');
  }

  async searchFor(term: string): Promise<void> {
    if (await this.searchInput.isVisible()) {
      await this.searchInput.fill(term);
      if (await this.searchSubmitButton.isVisible()) {
        await this.searchSubmitButton.click();
      } else {
        await this.searchInput.press('Enter');
      }
      await this.page.waitForLoadState('domcontentloaded');
    } else {
      await this.navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  }

  async verifyInitialMessage(expectedText: string): Promise<void> {
    await expect(this.page.locator('body')).toContainText(expectedText);
  }

  async verifySearchResultContains(productName: string): Promise<void> {
    const resultLink = this.page.locator('a[href*="/products/"]').filter({ hasText: productName }).first();
    await expect(resultLink).toBeVisible();
  }

  async verifyNoResultsFor(term: string): Promise<void> {
    const matchingProducts = await this.page.locator('a[href*="/products/"]').count();
    expect(matchingProducts).toBe(0);
    await expect(this.page.locator('body')).toContainText(new RegExp(term, 'i'));
  }
}
