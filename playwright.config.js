// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false, // স্টেবল এপিআই রানের জন্য ফলস রাখা ভালো
  retries: 0,         
  reporter: 'html',   
  use: {
    trace: 'on-first-retry',              
  },
  projects: [
    // ১. প্রথম প্রোজেক্ট: শুধুমাত্র UI টেস্টের জন্য (এটি ব্রাউজার ব্যবহার করবে)
    {
      name: 'ui-tests',
      testMatch: /.*login\.spec\.js/, // শুধুমাত্র লগইন টেস্ট ফাইল ধরবে
      use: { 
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        ...devices['Desktop Chrome'] 
      },
    },
    // ২. দ্বিতীয় প্রোজেক্ট: শুধুমাত্র API টেস্টের জন্য (কোনো ব্রাউজার বা Saucedemo বেস ইউআরএল থাকবে না)
    {
      name: 'api-tests',
      testMatch: /.*api\.spec\.js/, // শুধুমাত্র এপিআই টেস্ট ফাইল ধরবে
      use: {
        // এখানে কোনো ব্রাউজার সেটিংস বা বেস ইউআরএল নেই, এটি সম্পূর্ণ স্বাধীন ও আইসোলেটেড
      }
    }
  ],
});