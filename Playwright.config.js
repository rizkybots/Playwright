// playwright.config.js

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  // Folder test
  testDir: './tests',

  // Jalankan test secara paralel
  fullyParallel: true,

  // Gagal jika ada test.only di CI
  forbidOnly: !!process.env.CI,

  // Retry jika gagal di CI
  retries: process.env.CI ? 2 : 0,

  // Worker
  workers: process.env.CI ? 1 : undefined,

  // Reporter
  reporter: 'html',

  use: {

    // Base URL
    // baseURL: 'http://127.0.0.1:3000',

    // Screenshot saat gagal
    screenshot: 'only-on-failure',

    // Trace saat retry
    trace: 'on-first-retry',

  },

  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

  ],

});