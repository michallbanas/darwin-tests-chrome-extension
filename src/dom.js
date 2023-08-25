import { COPY_MESSAGE, ADD_MESSAGE, ANIMATION_DURATION } from "./consts.js"

export function createListItem(query, copyQueryToClipboard, addQueryToUrl) {
  const displayText = getTruncatedText(query)
  const listItem = document.createElement("li")
  const textSpan = document.createElement("span")
  textSpan.id = "text-span"
  textSpan.textContent = displayText
  listItem.appendChild(textSpan)

  const copyButton = document.createElement("button")
  copyButton.id = "copy-button"
  copyButton.textContent = "Copy"
  copyButton.addEventListener("click", copyButtonClickHandler)
  listItem.appendChild(copyButton)

  const addButton = document.createElement("button")
  addButton.id = "add-button"
  addButton.textContent = "Add to URL"
  addButton.addEventListener("click", addButtonClickHandler)
  listItem.appendChild(addButton)

  return listItem

  function copyButtonClickHandler() {
    copyQueryToClipboard(query)
    animateListItem(listItem, COPY_MESSAGE, textSpan, copyButton, addButton)
  }

  function addButtonClickHandler() {
    addQueryToUrl(query)
    animateListItem(listItem, ADD_MESSAGE, textSpan, copyButton, addButton)
  }
}

export function getTruncatedText(query) {
  const queryLengthMax = 80
  const equalIndex = query.indexOf("=")

  if (!query.includes("mock")) {
    const sliceQuery = query.slice(0, 60)
    return sliceQuery
  }

  const displayText =
    query.length < queryLengthMax
      ? query.substring(equalIndex + 1)
      : query
          .slice(0, 60)
          .substring(equalIndex + 1)
          .split("?")[0]
  return displayText
}

function animateListItem(listItem, message, textSpan, copyButton, addButton) {
  listItem.classList.add("copied")
  listItem.textContent = message
  setTimeout(() => {
    listItem.classList.remove("copied")
    listItem.textContent = ""
    listItem.appendChild(textSpan)
    listItem.appendChild(copyButton)
    listItem.appendChild(addButton)
  }, ANIMATION_DURATION)
}

export function toggleHeartIcon() {
  const heartIcon = document.getElementById("heart-icon")

  heartIcon.addEventListener("click", () => {
    heartIcon.textContent = "♥"
    setTimeout(() => {
      heartIcon.textContent = "♡"
    }, ANIMATION_DURATION)
  })
}
