export function clearSessionStorageContent(sessionStorageItem) {
  sessionStorageItem.textContent = ""
}

export function appendListItems(formattedData, sessionStorageItem) {
  sessionStorageItem.textContent = ""

  const listItems = formattedData
    ? formattedData.split(", ").map(createListItemPopover)
    : ["No session storage data found"].map(createListItemPopover)

  const fragment = document.createDocumentFragment()
  fragment.append(...listItems)

  sessionStorageItem.appendChild(fragment)
}

export function createListItemPopover(text) {
  const listItem = document.createElement("li")
  listItem.textContent = text
  listItem.classList.add("sessionStorageItem")
  return listItem
}

export function getSessionStorageItem(key) {
  const invokeSessionStorageItem = window.sessionStorage.getItem(key)
  const sessionStorageItem = JSON.parse(invokeSessionStorageItem ?? "{}")
  return sessionStorageItem
}

export function formatSessionStorageItem(sessionStorageItem) {
  const keysAndValues = Object.entries(sessionStorageItem)
  const formattedKeysAndValues = keysAndValues.map(([key, value]) => `${key}: ${value}`)
  return formattedKeysAndValues.join(", ")
}
