import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { parseGbpPrice } from '../utils/price-utils';

export class ProductDetailPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly variantSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('h1, h2').filter({ hasText: /.+/ }).last();
    this.productPrice = page.locator('form[action*="/cart/add"] .price, #product-price, h2, h3, span').filter({ hasText: /£\d+/ }).first();
    this.addToCartButton = page.locator('form[action*="/cart/add"] input[type="submit"]:visible, form[action*="/cart/add"] button[type="submit"]:visible, #add:visible').first();
    this.variantSelect = page.locator('select#product-select, form[action*="/cart/add"] select').first();
  }

  async openByHandle(handle: string): Promise<void> {
    await this.navigate(`/products/${handle}`);
  }

  async verifyProductDetails(expectedTitle: string, expectedPrice: string): Promise<void> {
    await expect(this.page.locator('body')).toContainText(expectedTitle);
    const priceText = await this.productPrice.innerText();
    expect(parseGbpPrice(priceText)).toBe(parseGbpPrice(expectedPrice));
  }

  async clickAddToCart(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
    const cartAddResponsePromise = this.page
      .waitForResponse((res) => res.url().includes('/cart/add') && res.status() < 400, { timeout: 10000 })
      .catch(() => null);

    await this.addToCartButton.click();
    await cartAddResponsePromise;
    await expect(this.headerCartLink).not.toContainText('(0)', { timeout: 10000 });
  }

  async verifySoldOutState(): Promise<void> {
    // Sauce Demo omits the purchase form and Add to Cart button entirely for sold-out products
    const visibleButtons = await this.addToCartButton.count();
    if (visibleButtons === 0) {
      expect(visibleButtons).toBe(0);
      return;
    }
    const isDisabled = await this.addToCartButton.isDisabled();
    const label = (await this.addToCartButton.inputValue().catch(() => this.addToCartButton.innerText())) || '';
    expect(isDisabled || /sold out/i.test(label)).toBeTruthy();
  }
}
