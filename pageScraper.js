const scraperObject = {
	url: 'https://www.walgreens.com/',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);

        console.log(`Navigating to Household Essentials...`);
        await page.goto('https://www.walgreens.com/store/c/household-essentials/ID=20000910-tier1?ban=dl_dl_FeatCategory_HouseholdEssentials_CONTROL' );

        
        console.log(`Navigating to Toilet Papers...`);
        await page.goto('https://www.walgreens.com/store/c/toilet-paper/ID=20000944-tier3' );


		await page.waitForSelector('section#productSection');
		let urls = await page.$$eval('.product-card-container > ul.product-container > li', links => {
		links = links.map(el => el.querySelector('a').href)
		return links;
		});
        console.log(urls);
	}


}


module.exports = scraperObject;