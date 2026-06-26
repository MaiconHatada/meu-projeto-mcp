import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  //timeout: 6000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL:   process.env.BASE_URL,
    headless:  process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
  },
});
