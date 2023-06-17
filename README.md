# Darwin A/B Tests - Chrome Extension

Hey there! 👋 This is a Chrome extension that will help you to easily access the test values you need. You can copy the test to clipboard or add the test to the URL 🎉

Like this:
![Example of Darwin Tests Extension](./design/darwinTestsChromeExtension.png)

## Installation

1. Clone this repo
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer Mode
4. Click "Load unpacked"
5. Select the `darwin-tests-chrome-extension` folder

## Before using

1. In `data` folder, create a folder named `source` and put the `queries.js` file in it. This file contains the queries that will be used to fetch the tests.
2. You can see in example folder how the `queries.js` file should look like.
3. Basically, the file should look like this:

```javascript
export const queries = [
  "?mock_test=I_NEED_COFFEE_on",
  "?mock_test=ALIENS_EXIST_on",
  "?mock_test=EASY_RIGHT_on",
]
```

## How to use

1. Open Chrome and go to any page you want to use the extension on
2. Click on the Darwin Tests extension icon
3. The extension should be loaded and you should see a list of tests

## Features

- Copy the test to clipboard
- Add the test to the URL

💡 Hint:

- Even you can see only the name of the test, the whole test is copied to clipboard or added to the URL. What does it mean? If you see eg. `I_NEED_COFFEE_on`, the whole test `?mock_test=I_NEED_COFFEE_on` is copied to clipboard or added to the URL.

## How to update

1. Pull the latest changes from the repo
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Darwin A/B Tests extension
4. Or click on Update button next to Pack extension and Load unpacked.

## That's it!

I hope you find this extension useful. If you have any questions, feel free to contact me.
