const webdriver = require('selenium-webdriver');
const fs = require('fs');
  
// {Builder, By, Key, until} = require('selenium-webdriver');
const request = require('request-promise');
_VISITED = [];
homepageURL = 'http://michael.caspianservices.com/avada/';
screenshotCounter = 1;
// http://caspianclients.com/akopyan/


(async function start() {
  _VISITED[homepageURL] = true;
  await getPageLinks(homepageURL);
  // should there be any unvisited pages in this site this loop continues

  // console.log(_VISITED)
  do{
    for (let pageUrl in _VISITED) {
      if (! _VISITED[pageUrl]) 
      {
        _VISITED[pageUrl] = true;
        await getPageLinks(pageUrl);
      }
    }
  }
  while( !visitedAllPages() )

  
  console.log(_VISITED)


})();


 function visitedAllPages(){
  var allVisited = true;

  for(let key in _VISITED) {
    console.log(_VISITED[key])
    if (  !_VISITED[key] )
    {
      allVisited = false;
      break;
    }
      
  }
  return allVisited;
}


function isValidAnchor(text, href) {
    return text.length > 0              // has to have text
        && href                         // must not be null
        && href.includes(homepageURL)   // must be the host url, don't want to start scraping other sites on accident
        && !href.includes('#')          // no hasthtags
        && !href.includes('wp-content') // no images or uploaded content
        && !href.includes('tel:');         // no telephone numbers tel:818.888.8888
}

async function getPageLinks(url) {
  let driver = await new webdriver.Builder().forBrowser('chrome').build();
  webdriver.WebDriver.prototype.saveScreenshot = filename => {
    return driver.takeScreenshot().then(data =>  {
      fs.writeFile(`${__dirname}/screenshots/${filename}`, data.replace(/^data:image\/png;base64,/,''), 'base64', err => {
        if(err) throw err
      })
    })
  }


  try {
    console.log("SCANNING PAGE LINKS @ " + url);
    await driver.get(url);
    // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // await driver.wait(until.titleIs('webdriver - Google Search'), 5000);
    let links = await driver.findElements({css:'a'});

  
    for(let link of links) {
        var now = (Date.now()/1e3)|0;

        var text = await link.getText(),
            href = await link.getAttribute("href");

        if ( isValidAnchor(text, href) && _VISITED[href] == null) {          
          try {
           await request({
                url: href,
                method: 'GET',
                data: {
                }
              }, function(err, res, body) {
                console.log({text: text, href: href, statusCode: res.statusCode});
                _VISITED[href] = false;
              });
            } catch (err) {
              // We dont want to go to a broken page link to scan for links so we mark true
              await driver.executeScript('arguments[0].scrollIntoView(); arguments[0].setAttribute("style", "border: solid 2px red");', link);
              driver.saveScreenshot(`${text} ${screenshotCounter} ${now}.png`);
              
              _VISITED[href] = true;
            }  
        } 
            
    }
    
  } finally {
    await driver.quit();
  }
}
