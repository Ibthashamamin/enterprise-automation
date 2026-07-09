// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true, // Run tests simultaneously to save corporate build time
  retries: 1,         // Rerun a failed test once automatically to combat "flakiness"
  reporter: 'html',   // Generate rich clean HTML dashboard execution reports
  use: {
    baseURL: 'https://www.saucedemo.com', // Central environment target
    trace: 'on-first-retry',              // Capture network/UI logs if a test fails
    headless: true,                       // Run without opening visible windows (for speed and CI/CD compatibility)
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});