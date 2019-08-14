const {Builder, By, Key, until} = require('selenium-webdriver');
const request = require('request-promise');
_VISITED = [];
homepageURL = 'http://caspianclients.com/akopyan/';

(async function start() {
  _VISITED[homepageURL] = true;
  await getPageLinks(homepageURL);
  console.log(_VISITED)
  for (let pageUrl in _VISITED) {
    if (! _VISITED[pageUrl]) 
    {
      _VISITED[pageUrl] = true;
      await getPageLinks(pageUrl);
    }
  }
  console.log(_VISITED)
  for (let pageUrl in _VISITED) {
    if (! _VISITED[pageUrl]) 
    {
      _VISITED[pageUrl] = true;
      await getPageLinks(pageUrl);
    }
  }


})();




function isValidAnchor(text, href) {
    return text.length > 0              // has to have text
        && href                         // must not be null
        && href.includes(homepageURL)   // must be the host url, don't want to start scraping other sites on accident
        && !href.includes('#')          // no hasthtags
        && !href.includes('wp-content') // no images or uploaded content
        && !href.includes('tel:');         // no telephone numbers tel:818.888.8888
}

async function getPageLinks(url) {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(url);
    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // await driver.wait(until.titleIs('webdriver - Google Search'), 5000);
    let links = await driver.findElements({css:'a'});

  
    for(let link of links) {
        
        var text = await link.getText(),
        href = await link.getAttribute("href");

        if ( isValidAnchor(text, href) && _VISITED[href] == null) {          
          _VISITED[href] = false;
          try {
           await request({
                url: href,
                method: 'GET',
                data: {
                }
              }, function(err, res, body) {
                console.log({text: text, href: href, statusCode: res.statusCode});
              });
            } catch (err) {
              // We dont want to go to a broken page link to scan for links so we mark true
              _VISITED[href] = true;
            }  
        } 
            
    }
    
  } finally {
    await driver.quit();
  }
}

