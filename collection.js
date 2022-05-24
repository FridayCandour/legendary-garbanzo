const collectionLoader = require("./collectionLoader.js")

const scraperObject = async (browser, url) => {
	let page = await browser.newPage();
	console.log(`Navigating to ${url}...`);
	await page.goto(url);
	await page.waitForSelector('.gwSdeh')
	await page.waitForFunction(() => document.readyState === "complete");
	let elements = await page.$$('.ckgUnd a')
	let links = elements.map(async (el)=> await page.evaluate(el => el.href, el))
    links.forEach( async (nft) => {
     let nftPage = await browser.newPage();
	 await nftPage.goto( await nft);
	 await nftPage.waitForSelector(".kExCTt")
	 await nftPage.waitForFunction(() => document.readyState === "complete");
     await collectionLoader(nftPage);
	 return
	})
}

module.exports = scraperObject;