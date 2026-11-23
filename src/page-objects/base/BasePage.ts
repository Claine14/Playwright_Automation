import { Locator, Page, expect } from '@playwright/test';
import { envConfig } from '../../config/load-env';

export class BasePage {
  readonly page: Page;
  readonly baseUrl: string;

  // Global Header & Navigation Locators
  readonly topSearchLink: Locator;
  readonly topAboutUsLink: Locator;
  readonly topLogInLink: Locator;
  readonly topSignUpLink: Locator;
  readonly headerCartLink: Locator;
  readonly headerCheckOutLink: Locator;
  readonly storeLogoLink: Locator;
  readonly storeTagline: Locator;
  readonly sideNavMenu: Locator;
  readonly mainHeading: Locator;
  readonly breadcrumb: Locator;
  readonly footerSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = envConfig.baseUrl;

    this.topSearchLink = page.locator('header nav a[href="/search"]:visible').first();
    this.topAboutUsLink = page.locator('header nav a[href="/pages/about-us"]:visible').first();
    this.topLogInLink = page.locator('header nav a[href="/account/login"]:visible').first();
    this.topSignUpLink = page.locator('header nav a[href="/account/register"]:visible').first();
    this.headerCartLink = page.locator('header a.cart-target').first();
    this.headerCheckOutLink = page.locator('header a[href="/cart"]:visible', { hasText: 'Check Out' }).first();
    this.storeLogoLink = page.locator('header h1 a[href="/"]');
    this.storeTagline = page.locator('header h3');
    this.sideNavMenu = page.locator('nav ul').first();
    this.mainHeading = page.locator('h1').last();
    this.breadcrumb = page.locator('[itemscope], .breadcrumb').first();
    this.footerSection = page.locator('footer');
  }

  async navigate(path: string = '/'): Promise<void> {
    const targetUrl = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  }

  async clickSideMenuLink(linkText: string): Promise<void> {
    await this.sideNavMenu.getByRole('link', { name: linkText, exact: true }).click();
  }

  async clickHeaderLink(linkText: string): Promise<void> {
    await this.page
      .locator('header a:visible')
      .filter({ hasText: new RegExp(`^${linkText}$`, 'i') })
      .first()
      .click();
  }

  async clickFooterLink(linkText: string): Promise<void> {
    await this.footerSection.getByRole('link', { name: linkText, exact: true }).first().click();
  }

  async expectCartCount(expectedCount: string): Promise<void> {
    await expect(this.headerCartLink).toContainText(expectedCount);
  }

  async getCartCountText(): Promise<string> {
    const raw = (await this.headerCartLink.innerText()).trim();
    const match = raw.match(/\(\d+\)/);
    return match ? match[0] : raw;
  }

  async expectUrlContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  async expectHeadingText(expected: string): Promise<void> {
    await expect(this.mainHeading).toHaveText(expected);
  }
}
