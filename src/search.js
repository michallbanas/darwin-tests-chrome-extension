export function noResultsMessage() {
  const noResultsMessage = document.createElement("div")
  noResultsMessage.id = "noResultsMessage"
  noResultsMessage.textContent = "No results found"
  return noResultsMessage
}

export function setupLiveSearch() {
  const searchInput = document.getElementById("searchInput")
  const parentElementQueries = document.getElementById("queries")
  const queries = document.querySelectorAll("#queries li")
  let noResultsMessageElement = null

  if (!searchInput || !queries) {
    throw new Error("Either searchInput or queries not found.")
  }
  searchInput.addEventListener("input", () => {
    const seachTerm = searchInput.value.toLowerCase()
    let seachTermFound = false
    queries.forEach((query) => {
      const textSpan = query.querySelector("#text-span")
      const queryMatchSearchTerm = textSpan.textContent.toLowerCase().includes(seachTerm)

      if (queryMatchSearchTerm) {
        query.style.display = "flex"
        seachTermFound = true
      } else {
        query.style.display = "none"
      }
    })

    if (!seachTermFound) {
      if (!noResultsMessageElement) {
        noResultsMessageElement = noResultsMessage()
        parentElementQueries.appendChild(noResultsMessageElement)
      }
    } else if (noResultsMessageElement) {
      parentElementQueries.removeChild(noResultsMessageElement)
      noResultsMessageElement = null
    }
  })
}
