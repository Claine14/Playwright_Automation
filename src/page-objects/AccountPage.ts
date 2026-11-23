import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class AccountPage extends BasePage {
  // Login Form
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly signInButton: Locator;
  readonly createAccountLink: Locator;
  readonly loginErrorBanner: Locator;

  // Registration Form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly registerEmailInput: Locator;
  readonly registerPasswordInput: Locator;
  readonly createSubmitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginEmailInput = page.locator('input#customer_email, input[name="customer[email]"]').first();
    this.loginPasswordInput = page.locator('input#customer_password, input[name="customer[password]"]').first();
    this.signInButton = page.locator('form[action*="/account/login"] input[type="submit"], form[action*="/account/login"] button[type="submit"]').first();
    // Use :visible so Playwright skips the hidden mobile sidebar duplicate link
    this.createAccountLink = page.locator('a[href="/account/register"]:visible').first();
    this.loginErrorBanner = page.locator('.errors, [class*="error"], form[action*="/account/login"]').first();

    this.firstNameInput = page.locator('input#first_name, input[name="customer[first_name]"]').first();
    this.lastNameInput = page.locator('input#last_name, input[name="customer[last_name]"]').first();
    this.registerEmailInput = page.locator('input#email, input[name="customer[email]"]').first();
    this.registerPasswordInput = page.locator('input#password, input[name="customer[password]"]').first();
    this.createSubmitButton = page.locator('form[action*="/account"] input[type="submit"], form[action*="/account"] button[type="submit"]').first();
  }

  async openLogin(): Promise<void> {
    await this.navigate('/account/login');
  }

  async openRegister(): Promise<void> {
    await this.navigate('/account/register');
  }

  async submitLogin(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyLoginRejected(): Promise<void> {
    const url = this.page.url();
    const stayedOnAuthFlow = url.includes('/account/login') || url.includes('/challenge');
    expect(stayedOnAuthFlow).toBeTruthy();
  }

  async verifyRegistrationFieldsVisible(): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.registerEmailInput).toBeVisible();
    await expect(this.registerPasswordInput).toBeVisible();
    await expect(this.createSubmitButton).toBeVisible();
  }
}
