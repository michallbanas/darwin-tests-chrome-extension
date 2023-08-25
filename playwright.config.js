import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  name: "Integration tests for Darwin A/B Tests Chrome Extension",
  reporter: "null",
  use: {
    testIdAttribute: "test-pw",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 636, height: 436 } },
    },
  ],
})
