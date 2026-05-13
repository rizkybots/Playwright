const { expect } = require("@playwright/test");

async function click(locator, name = "element") {
  await expect(locator).toBeVisible({
    timeout: 30000,
  });

  await locator.click();
}

async function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

module.exports = {
  click,
  sleep,
};