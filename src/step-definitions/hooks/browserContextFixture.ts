import { Browser, BrowserContext, chromium, firefox, Page, webkit } from '@playwright/test';
import { envConfig } from '../../config/load-env';
import { applyPlaywrightTimeouts } from '../../utils/playwright-timeout';

export interface BrowserSession {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

export async function launchBrowserSession(): Promise<BrowserSession> {
  const browserType =
    envConfig.browser === 'firefox'
      ? firefox
      : envConfig.browser === 'webkit'
        ? webkit
        : chromium;

  const browser = await browserType.launch({ headless: envConfig.headless });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  applyPlaywrightTimeouts(page);

  return { browser, context, page };
}

export async function closeBrowserSession(session: BrowserSession): Promise<void> {
  await session.page?.close().catch(() => {});
  await session.context?.close().catch(() => {});
  await session.browser?.close().catch(() => {});
}
