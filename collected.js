const nftLoader = require("./cnft.js")

const scraperObject = async (browser, url) => {
	let page = await browser.newPage();
	console.log(`Navigating to ${url}...`);
	await page.goto(url);
	// Wait for the required DOM to be rendered
	await page.waitForFunction(() => document.readyState === "complete");
	await page.waitForSelector('.token-card');
	await page.evaluate(scrollToBottom);
	await page.waitForTimeout(3000);

  async function scrollToBottom() {
	await new Promise(resolve => {
	  const distance = 100; // should be less than or equal to window.innerHeight
	  const delay = 100;
	  const timer = setInterval(() => {
		document.scrollingElement.scrollBy(0, distance);
		if (document.scrollingElement.scrollTop + window.innerHeight >= document.scrollingElement.scrollHeight) {
		  clearInterval(timer);
		  resolve();
		}
	  }, delay);
	});
  }

	let elements = await page.$$('.token-card--link')
	let links = elements.map(async (el)=> await page.evaluate(el => el.href, el))
	//
	links.forEach( async (nft) => {
	let   nftPage = await browser.newPage();
	await nftPage.goto(await nft);
	await nftPage.waitForFunction(() => document.readyState === "complete");
	await nftPage.evaluate(scrollToBottom);
    await nftPage.waitForSelector(".short-text")
    await nftLoader(nftPage)
	await nftPage.close()
    });
	await page.close()
}

module.exports = scraperObject;