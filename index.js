const userLink = 'https://nft.wazirx.org/CryptBuddha'
// const userLink = 'https://nft.wazirx.org/KashBani'

const browserObject = require('./browser.js');
const scraperController = require('./pageController.js');
//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();
// Pass the browser instance to the scraper controller
scraperController(browserInstance, userLink)