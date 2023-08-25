import { test as base, expect as baseExpect, chromium, type BrowserContext } from "@playwright/test"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

export const test = base.extend<{
  context: BrowserContext
  extensionId: string
}>({
  context: async ({}, use) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const pathToExtension = path.join(__dirname, "../")
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    })
    await use(context)
    await context.close()
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers()
    if (!background) background = await context.waitForEvent("serviceworker")

    const extensionId = background.url().split("/")[2]
    await use(extensionId)
  },
})
export const expect = baseExpect
