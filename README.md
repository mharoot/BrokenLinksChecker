# BrokenLinksChecker
NODE JS Broken Links Checker crawls all your web pages checking for broken links.

### How to Use:
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

### Dependencies
```js
  "devDependencies": {
    "mocha": "^6.2.0",
    "request": "^2.88.0",
    "request-promise": "^4.2.4",
    "selenium-webdriver": "^4.0.0-alpha.4"
  }
```
