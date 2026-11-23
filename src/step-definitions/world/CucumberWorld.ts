import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { PageManager } from '../../page-objects/base/PageManager';

export class CucumberWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  pages!: PageManager;

  constructor(options: IWorldOptions) {
    super(options);
  }

  initPages(page: Page): void {
    this.page = page;
    this.pages = new PageManager(page);
  }
}

setWorldConstructor(CucumberWorld);
