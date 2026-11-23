# Sauce Demo UI Automation Framework

Playwright + Cucumber (TypeScript) BDD UI test automation framework targeting `https://sauce-demo.myshopify.com/`.

## Quick Start

```bash
# 1. Install dependencies & Playwright browser
npm install
npx playwright install chromium

# 2. Copy environment config
cp env/.env.example env/.env

# 3. Run all UI scenarios or filter by tag
npm run test:ui
npm run test:ui:smoke
```
