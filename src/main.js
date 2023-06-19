import { queries } from "../data/source/queries.js"
import { copyTextToClipboard } from "./clipboard.js"
import { updateUrlWithQuery } from "./urls.js"
import { createListItem } from "./dom.js"

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
