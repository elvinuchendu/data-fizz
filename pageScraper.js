const scraperObject = {
	url: 'https://www.walgreens.com/',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
		// Wait for the required DOM to be rendered
		await page.waitForSelector('.CA__Featured-categories__full-width');
		// Get the link to all the required links in the featured categories
		let urls = await page.$$eval('.list__contain >  ul#at-hp-rp-featured-ul > li', links => {
			// Extract the links from the data
			links = links.map(el => el.querySelector('li > a').href)
			return links;
		});
		console.log(urls);
	}
}

module.exports = scraperObject;