/*global chrome*/

export async function updateUrlWithQuery(query) {
  try {
    return await new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          reject(new Error("No active tab found"))
        }
        const [tab] = tabs
        const url = new URL(tab.url)
        const decodedQuery = decodeURIComponent(query).replace("?", "")
        const existingParams = url.searchParams.toString()
        const updatedParams = existingParams
          ? `?${existingParams}&${decodedQuery}`
          : `?${decodedQuery}`
        const newUrl = `${url.origin}${url.pathname}${updatedParams}${url.hash}`
        chrome.tabs.update(tab.id, { url: newUrl }, () => {
          resolve()
        })
      })
    })
  } catch (error) {
    console.error(error)
  }
}
