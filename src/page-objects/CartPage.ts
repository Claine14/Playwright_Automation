import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';
import { parseGbpPrice } from '../utils/price-utils';

export class CartPage extends BasePage {
  readonly emptyCartText: Locator;
  readonly continueShoppingLink: Locator;
  readonly cartForm: Locator;
  readonly updateCartButton: Locator;
  readonly checkOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyCartText = page.locator('section p', { hasText: 'It appears that your cart is currently empty!' });
    this.continueShoppingLink = page.locator('section a[href="/collections/all"]', { hasText: 'Continue Shopping' });
    this.cartForm = page.locator('form[action="/cart"]:visible');
    this.updateCartButton = page.locator('form[action="/cart"] input[name="update"], form[action="/cart"] button[name="update"]').first();
    this.checkOutButton = page.locator('form[action="/cart"] input[name="checkout"], form[action="/cart"] button[name="checkout"]').first();
  }

  async open(): Promise<void> {
    await this.navigate('/cart');
  }

  async verifyEmptyCartMessage(expectedMessage: string): Promise<void> {
    await expect(this.emptyCartText).toContainText(expectedMessage);
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingLink.click();
  }

  async verifyItemInCart(productName: string, expectedUnitPrice: string): Promise<void> {
    await expect(this.cartForm).toBeVisible();
    await expect(this.cartForm).toContainText(productName);
    const formText = await this.cartForm.innerText();
    expect(formText).toContain(expectedUnitPrice);
  }

  async updateItemQuantity(productName: string, quantity: number): Promise<void> {
    const itemContainer = this.cartForm
      .locator('tr, .cart-item, .row, div')
      .filter({ hasText: productName })
      .filter({ has: this.page.locator('input[name*="updates"]') })
      .first();
    const qtyInput = itemContainer.locator('input[name*="updates"]').first();
    await qtyInput.fill(String(quantity));
    if (await this.updateCartButton.isVisible()) {
      await this.updateCartButton.click();
    } else {
      await qtyInput.press('Enter');
    }
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifySubtotal(expectedSubtotal: string): Promise<void> {
    const formText = await this.cartForm.innerText();
    const expectedNumeric = parseGbpPrice(expectedSubtotal);
    expect(formText).toContain(expectedNumeric.toFixed(2));
  }

  async removeItem(productName: string): Promise<void> {
    const itemContainer = this.cartForm
      .locator('tr, .cart-item, .row, div')
      .filter({ hasText: productName })
      .first();
    const removeLink = itemContainer.locator('a[href*="/cart/change"]').first();
    if (await removeLink.isVisible()) {
      await removeLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    } else {
      await this.updateItemQuantity(productName, 0);
    }
  }

  async proceedToCheckout(): Promise<void> {
    await expect(this.checkOutButton).toBeVisible();
    await this.checkOutButton.click();
  }
}
