import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL:   process.env.BASE_URL || 'https://www.google.com',
    headless:  process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
  },
});
