const pageScraper = require('./pageScraper.js');

async function scrapeAll(browserInstance, url){
	let browser;
	try{
		browser = await browserInstance;
		await pageScraper.scraper(browser, url);	
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, url) => scrapeAll(browserInstance, url)