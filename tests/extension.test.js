import { test, expect } from "./fixtures"
import { queries } from "../data/source/queries.js"

test.beforeEach(async ({ page, extensionId }) => {
  await test.step("Before each: Set Dark Mode", async () => {
    await page.addInitScript(() => {
      window.localStorage.setItem("theme-preference", "dark")
    })
  })

  await test.step("Before each: Open extension", async () => {
    await page.goto(`chrome-extension://${extensionId}/popup.html`)
  })
})

test("Dark/light mode is working", async ({ page }) => {
  const toogleButton = page.getByTestId("toogle-container")
  const checkbox = page.getByRole("checkbox")

  await test.step("Toogle button is visible and theme is dark", async () => {
    await expect(toogleButton).toBeVisible()
    await expect(checkbox).toHaveAttribute("aria-label", "dark")
  })

  await test.step("Click on toogle button to change theme to light", async () => {
    await toogleButton.click()
    await expect(checkbox).toHaveAttribute("aria-label", "light")
  })
})

test("all the content is visible", async ({ page }) => {
  await test.step("H1 is visible and has text 'Darwin A/B Tests'", async () => {
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator("h1")).toHaveText("Darwin A/B Tests")
  })

  const queriesList = page.locator("#queries > li")
  await test.step("All the queries are visible", async () => {
    for (const li of await queriesList.all()) await expect(li).toBeVisible()
  })

  const copyToClipboardButton = page.locator("button:has-text('Copy')")
  await test.step("All the copy buttons are visible and have correct length", async () => {
    await expect(copyToClipboardButton).toHaveCount(queries.length)
    for (const button of await copyToClipboardButton.all()) await expect(button).toBeVisible()
  })

  const addToUrlButton = page.locator("button:has-text('Add to URL')")
  await test.step("All the Add to url buttons are visible and have correct length", async () => {
    await expect(addToUrlButton).toHaveCount(queries.length)
    for (const button of await addToUrlButton.all()) await expect(button).toBeVisible()
  })

  const footer = page.locator("footer")
  await test.step("Footer is visible", async () => {
    await expect(footer).toBeVisible()
  })
})
