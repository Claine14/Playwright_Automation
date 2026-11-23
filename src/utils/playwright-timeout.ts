import { Page } from '@playwright/test';
import { envConfig } from '../config/load-env';

export function applyPlaywrightTimeouts(page: Page): void {
  page.setDefaultTimeout(envConfig.actionTimeout);
  page.setDefaultNavigationTimeout(envConfig.navigationTimeout);
}
