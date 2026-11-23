import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'env/.env') });

export const envConfig = {
  baseUrl: (process.env.BASE_URL || 'https://sauce-demo.myshopify.com').replace(/\/$/, ''),
  browser: (process.env.BROWSER || 'chromium').toLowerCase(),
  headless: process.env.HEADLESS !== 'false',
  cucumberTimeout: Number(process.env.CUCUMBER_TIMEOUT || 30000),
  playwrightTimeout: Number(process.env.PLAYWRIGHT_TIMEOUT || 30000),
  actionTimeout: Number(process.env.ACTION_TIMEOUT || 15000),
  navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT || 20000)
};
