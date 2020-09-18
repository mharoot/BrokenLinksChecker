# BrokenLinksChecker
NODE JS Broken Links Checker crawls all your web pages checking for broken links.

### How to Use:
##### Prereq: Setting up Chrome Driver
- Go to https://sites.google.com/a/chromium.org/chromedriver/downloads after you find out what version of chrome your running using your chrome browser.  There should be a 3 dot icon in the top right corner next to your profile pic if your logged in gail.  Go to help and about chrome to get the version.  You should see something like myne.
```
Google Chrome is up to date
Version 79.0.3945.130 (Official Build) (64-bit)
```
I am using chromedriver Version 79.0.3945.36 in the root directory where the package.json file sits.   This is completely fine when I tested on my mac os.  It supports any of the version 79's.  Doing it on windows is the same process.

- Next run the `./addChromeDriverToPathWindows.sh` script, adjust the file path as neccesary because myne is  `/Users/michaelknight/Desktop/broken-links-checker/chromedriver`

1. Give it a homepage url
```js
homepageURL = 'http://google.com/';
(async function start() {
  ...
```

2. Install Mocha Global
`npm install -g mocha`

3. Run it
`npm test`
`npm run test`
`npm run blog`

### Dependencies
```js
  "devDependencies": {
    "fs": "0.0.1-security",
    "mocha": "^6.2.0",
    "request": "^2.88.0",
    "request-promise": "^4.2.4",
    "selenium-webdriver": "^4.0.0-alpha.4"
  }
```

### Usage
It'll box a broken anchor link and scroll to it and take a picture
![accusamus 1 1565895520](https://user-images.githubusercontent.com/24758613/63119394-e617fa80-bf54-11e9-9f01-498212825ecc.png)
