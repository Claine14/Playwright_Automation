import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LandingPage } from './LandingPage';
import { HomePage } from '../HomePage';
import { CatalogPage } from '../CatalogPage';
import { ProductDetailPage } from '../ProductDetailPage';
import { CartPage } from '../CartPage';
import { SearchPage } from '../SearchPage';
import { AccountPage } from '../AccountPage';
import { BlogAndInfoPage } from '../BlogAndInfoPage';

export class PageManager {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly landingPage: LandingPage;
  readonly homePage: HomePage;
  readonly catalogPage: CatalogPage;
  readonly productDetailPage: ProductDetailPage;
  readonly cartPage: CartPage;
  readonly searchPage: SearchPage;
  readonly accountPage: AccountPage;
  readonly blogAndInfoPage: BlogAndInfoPage;

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.landingPage = new LandingPage(page);
    this.homePage = new HomePage(page);
    this.catalogPage = new CatalogPage(page);
    this.productDetailPage = new ProductDetailPage(page);
    this.cartPage = new CartPage(page);
    this.searchPage = new SearchPage(page);
    this.accountPage = new AccountPage(page);
    this.blogAndInfoPage = new BlogAndInfoPage(page);
  }
}
