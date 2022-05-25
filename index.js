const userLink = 'https://nft.wazirx.org/NACalligraphy'
// const userLink = 'https://nft.wazirx.org/winsomepriyanka'
// https://nft.wazirx.org/bhawnasehgal
// const userLink = 'https://nft.wazirx.org/CryptoSauga'

async function scrape() {
const browserObject = require('./browser.js');
const scraperController = require('./pageController.js');
//Start the browser and create a browser instance
const browserInstance = browserObject.startBrowser();
// Pass the browser instance to the scraper controller
 await scraperController(browserInstance, userLink)
}
scrape()