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
		let urls = await page.$$eval('.product-card-container > ul.product-container > li.card__product', links => {
		links = links.map(el => el.querySelector('a').href)
		return links;
		});

        //Loop through each of those links, open a new page instance and get the relevant data from them
		let pagePromise = (link) => new Promise(async(resolve, reject) => {
			let dataObj = {};
			let newPage = await browser.newPage();
			await newPage.goto(link);
			dataObj['productName'] = await newPage.$eval('#productTitle', text => text.textContent);
			dataObj['listPrice'] = await newPage.$eval('span.product__price', text => text.textContent);
            dataObj['description'] = await newPage.$eval('#prodDesc > div.inner > div > div:nth-child(1)', text => text.textContent);
			dataObj['productDimensions'] = await newPage.$eval('div.inner > div > div > div.wag-accordion-shipping-content.mb20.ml20 > p.universal-product-inches', text => text.textContent);
			dataObj['imageUrls'] = await newPage.$eval('#thumbnailImages > li > img', img => img.src);
			dataObj['productUPC'] = await newPage.$eval('div.inner > div > div > div.wag-accordion-shipping-content.mb20.ml20 > p.universal-Item-code', text => text.textContent);
			resolve(dataObj);
			await newPage.close();
		});

		for(link in urls){
			let currentPageData = await pagePromise(urls[link]);
			// scrapedData.push(currentPageData);
			console.log(currentPageData);
		}
	}


}


module.exports = scraperObject;