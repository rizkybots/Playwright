// playwright.config.js
// Optimized untuk RAM 8GB

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  // Jangan terlalu banyak parallel di RAM 8GB
  fullyParallel: false,

  // Worker sedikit agar ringan
  workers: 1,

  // Retry
  retries: 0,

  // Timeout global
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  use: {

    // Base URL
    baseURL: 'https://staging-halalmaxcert.indonesiancloud.com/',

    // Browser
    browserName: 'chromium',

    // Browser terlihat
    headless: false,

    // Ignore SSL staging
    ignoreHTTPSErrors: true,

    // Fullscreen browser
    viewport: null,

    // Timeout navigation
    navigationTimeout: 30000,

    // Timeout action
    actionTimeout: 10000,

    // Screenshot hanya saat gagal
    screenshot: 'only-on-failure',

    // Video OFF agar ringan
    video: 'off',

    // Trace OFF agar ringan
    trace: 'off',

    // Launch browser
    launchOptions: {

      slowMo: 0,

      args: [

        // Browser maximize
        '--start-maximized',

        // Disable GPU
        '--disable-gpu',

        // Disable extension
        '--disable-extensions',

        // Disable dev shm
        '--disable-dev-shm-usage',

        // Disable background process
        '--disable-background-networking',

        '--disable-background-timer-throttling',

        '--disable-renderer-backgrounding',

        '--disable-backgrounding-occluded-windows',

        // Disable notification
        '--disable-notifications',

        // Disable translate
        '--disable-translate',

        // Disable sync
        '--disable-sync',

        // Disable popup blocking
        '--disable-popup-blocking',

        // No first run
        '--no-first-run',

        '--no-default-browser-check',

      ],
    },
  },

  // Reporter ringan
  reporter: [
    ["html"],
    ["list"]
  ],

});