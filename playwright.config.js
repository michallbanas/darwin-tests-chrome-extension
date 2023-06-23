const { defineConfig, devices } = require("@playwright/test")

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  name: "Integration tests for Darwin A/B Tests Chrome Extension",
  reporter: "null",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 636, height: 436 } },
    },
  ],
})
