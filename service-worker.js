/*global chrome*/

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setTitle({ title: "Click to open Darwin Test Extension" })
  chrome.contextMenus.create({
    id: "extension-version",
    title: "Darwin Test Extension v0.6.2",
    contexts: ["all"],
  })

  chrome.contextMenus.create({
    id: "github repository",
    title: "Github Repository",
    contexts: ["all"],
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "github repository") {
    chrome.tabs.create({
      url: "https://github.com/michallbanas/darwin-tests-chrome-extension",
    })
  }
})
