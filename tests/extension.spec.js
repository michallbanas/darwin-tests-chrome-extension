import { test, expect } from "./fixtures"
import { queries } from "../data/source/queries.js"

test("all the content is visible", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`)
  await expect(page.locator("h1")).toBeVisible()
  await expect(page.locator("h1")).toHaveText("Darwin A/B Tests")

  const queriesList = page.locator("#queries > li")
  for (const li of await queriesList.all()) await expect(li).toBeVisible()

  const copyToClipboardButton = page.locator("button:has-text('Copy')")
  await expect(copyToClipboardButton).toHaveCount(queries.length)
  for (const button of await copyToClipboardButton.all()) await expect(button).toBeVisible()

  const addToUrlButton = page.locator("button:has-text('Add to URL')")
  await expect(addToUrlButton).toHaveCount(queries.length)
  for (const button of await addToUrlButton.all()) await expect(button).toBeVisible()

  const footer = page.locator("footer")
  await expect(footer).toBeVisible()
})
