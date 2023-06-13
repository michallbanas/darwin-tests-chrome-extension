document.addEventListener("DOMContentLoaded", () => {
  const queries = [
    "?darwin_mock_test=MULTICITY_LIMIT__on",
    "?darwin_mock_test=NUM_OF_PASSENGERS_PRICE__on",
    "?darwin_mock_test=QUICK_FILTERS__on",
  ]
  const queriesList = document.getElementById("queries")

  if (queriesList) {
    try {
      queries.forEach(query => {
        const listItem = createListItem(query)
        listItem.addEventListener("click", () => {
          copyQueryToClipboard(query)
          animateListItem(listItem, query, "Copied")
        })
        queriesList.appendChild(listItem)
      })
    } catch (error) {
      console.error("Error occurred while appending list items:", error)
    }
  } else {
    console.error("Unable to find the queries list element")
  }
})

function createListItem(query) {
  const listItem = document.createElement("li")
  listItem.textContent = query
  return listItem
}

function copyQueryToClipboard(query) {
  navigator.clipboard
    .writeText(query)
    .then(() => {
      console.log(`Text copied to clipboard: ${query}`)
    })
    .catch(error => {
      console.error("Unable to copy text:", error)
    })
}

function animateListItem(listItem, query, message) {
  listItem.classList.add("copied")
  listItem.textContent = message
  setTimeout(() => {
    listItem.classList.remove("copied")
    listItem.textContent = query
  }, 1000)
}
