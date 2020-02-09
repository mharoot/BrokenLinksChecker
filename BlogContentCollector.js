const webdriver = require('selenium-webdriver');
const fs = require('fs');
  
// {Builder, By, Key, until} = require('selenium-webdriver');
const request = require('request-promise');
_VISITED = [];
homepageURL = 'https://kristinmullertranscription.com/';
screenshotCounter = 1;

const articleArchivesSelector = '.articles-list a';
const blogPostImgsSelector = 'article.post img, .entry-content img';



(async function start() {
  _VISITED[homepageURL] = true;
  _VISITED['https://kristinmullertranscription.com/blog/'] = true;
  await getPageLinks('https://kristinmullertranscription.com/blog/', articleArchivesSelector);
  // should there be any unvisited pages in this site this loop continues
  do{
    for (let pageUrl in _VISITED) {
      if (! _VISITED[pageUrl]) 
      {
        _VISITED[pageUrl] = true;
        await getBlogContent(pageUrl, blogPostImgsSelector);
      }
    }
  }
  while( !visitedAllPages() )

  
  console.log(_VISITED)


})();

async function getBlogContent(url, selector){  
  let driver = await new webdriver.Builder().forBrowser('chrome').build();
  webdriver.WebDriver.prototype.saveScreenshot = filename => {
    return driver.takeScreenshot().then(data =>  {
      fs.writeFile(`${__dirname}/screenshots/${filename}`, data.replace(/^data:image\/png;base64,/,''), 'base64', err => {
        if(err) throw err
      })
    })
  }


  try {
    console.log("SCANNING PAGE: " + url);
    await driver.get(url);
    // article.post img and .entry-content
    let imgs = await driver.findElements({css: selector});
  
    for(let img of imgs) {
        var now = (Date.now()/1e3)|0;

        var src = await img.getAttribute("src");        
        try {
          var download = async function(uri, filename, callback){
            
            request.head(uri, async function(err, res, body){
              // console.log('content-type:', res.headers['content-type']);
              // console.log('content-length:', res.headers['content-length']);
              console.log(uri);
              await request(uri).pipe(fs.createWriteStream(filename).on('close', callback));

            });
          };

         var exploded = src.split('/');
         var filename = exploded[exploded.length - 1];
         var dir = filename.split('.')[0];

         // if its a valid image
         if ( (src.includes('.jpg') || src.includes('.png') || src.includes('.jpeg')) 
              && !src.includes("data:") ) {
            // create directory if it doesn't exist
            if ( !fs.existsSync(dir) ) fs.mkdirSync(dir);

            // download the image source into the dynamically created directory
            download(src, dir+'/'+filename, function(){console.log(dir+'/'+filename)});
            // let content = await driver.findElement({css: ".single .entry-content"});
            function processHTML(dir, innerHTML){
                String.prototype.replaceAll = function(search, replacement) {
                    var target = this;
                  return target.replace(new RegExp(search, 'g'), replacement);
                }
                // seems to have no effect I can paste as is plain text mode in wp bakery
                // var newHtml =  innerHTML.replaceAll("</p>","</p> &nbsp;");
                fs.writeFileSync(`${dir}/${dir}-entry-content.txt`, innerHTML, err => {
                    if(err) {console.log(err); return; throw err} else {console.log(innerHTML)}
                  });
            }
            await driver.executeScript(function() {
                return document.querySelector('.single .entry-content').innerHTML;
              }).then(function(innerHTML) {
                //   console.log(innerHTML);
                  console.log("THIS IS @@@@@@@ "+dir)
                  processHTML(dir, innerHTML)
                  
               
              });
            
            
            
         }
        
        } catch (err) {
            // We dont want to go to a broken page link to scan for links so we mark true
            // await driver.executeScript('arguments[0].scrollIntoView(); arguments[0].setAttribute("style", "border: solid 2px red");', link);
            // driver.saveScreenshot(`${text} ${screenshotCounter} ${now}.png`);
           // _VISITED[href] = true;
           console.log(err)
        }     
    }
    
  } finally {
    await driver.quit();
  }
}

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
        && !href.includes('tel:')       // no telephone numbers tel:818.888.8888
        && !href.includes('mailto:')    // no emails 
        && !href.includes('=http')      // prevents navigating to other webpages like LinkedIn
        && href.split('/').length === 5; // standard blog url format
    // https://kristinmullertranscription.com/convert-paper-files-to-emr/
    // https://kristinmullertranscription.com/category/emr-abstraction/
}

async function getPageLinks(url, blog_archive_selector) {
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

    let links = await driver.findElements({css: blog_archive_selector});

  
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
