import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    launchOptions: {
      executablePath: 'C:\\Users\\david\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe'
    }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        launchOptions: {
          executablePath: 'C:\\Users\\david\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe'
        }
      },
    },
  ],
});
