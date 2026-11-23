import { defineConfig } from '@playwright/test';
import { envConfig } from './src/config/load-env';

export default defineConfig({
  timeout: envConfig.playwrightTimeout,
  use: {
    baseURL: envConfig.baseUrl,
    headless: envConfig.headless,
    viewport: { width: 1366, height: 768 },
    actionTimeout: envConfig.actionTimeout,
    navigationTimeout: envConfig.navigationTimeout,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});
