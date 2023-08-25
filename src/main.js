/*global chrome*/

import { queries } from "../data/source/queries.js"
import { copyTextToClipboard } from "./clipboard.js"
import { updateUrlWithQuery } from "./urls.js"
import { createListItem, toggleHeartIcon } from "./dom.js"
import {
  getSessionStorageItem,
  formatSessionStorageItem,
  clearSessionStorageContent,
  appendListItems,
} from "./session-storage.js"
import { sessionStorageKey } from "../data/source/sessionStorage.js"

function addQueryToUrl(query) {
  updateUrlWithQuery(query).catch((error) => {
    console.error("Unable to update URL:", error)
  })
}

function copyQueryToClipboard(query) {
  copyTextToClipboard(query)
    .then(() => {
      console.log(`Yay! 🥳 Text copied to clipboard: ${query}`)
    })
    .catch((error) => {
      console.error("Unable to copy text:", error)
    })
}

function initializeApp() {
  const queriesList = document.getElementById("queries")

  if (queriesList) {
    try {
      queries.forEach((query) => {
        const listItem = createListItem(query, copyQueryToClipboard, addQueryToUrl)
        queriesList.appendChild(listItem)
      })
    } catch (error) {
      console.error("Error occurred while appending list items:", error)
    }
  } else {
    console.error("Unable to find the queries list element")
  }
}

document.addEventListener("DOMContentLoaded", initializeApp)
document
  .getElementById("getSessionStorageButton")
  .addEventListener("click", handleGetSessionStorage)

function disabledButton() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const [tab] = tabs
    if (tab.url === "chrome://newtab/" || tab.url === "chrome://extensions/") {
      const button = document.getElementById("getSessionStorageButton")
      button.disabled = true
      button.style.display = "none"
    }
  })
}

disabledButton()
toggleHeartIcon()

async function handleGetSessionStorage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getSessionStorageItem,
      args: [sessionStorageKey],
    })

    const sessionStorageData = result[0].result
    const formattedData = formatSessionStorageItem(sessionStorageData)

    const sessionStorageItem = document.getElementById("sessionStorageContent")
    clearSessionStorageContent(sessionStorageItem)
    appendListItems(formattedData, sessionStorageItem)
  } catch (error) {
    console.error("An error during loading session storage:", error)
  }
}
