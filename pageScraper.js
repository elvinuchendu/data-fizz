const fs = require('fs');
const scraperObject = {
	url: 'https://www.walgreens.com/',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
		let scrapedData = [];

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
			dataObj['productBrand'] = await newPage.$eval('#productName > div > a', el => el.textContent);
			dataObj['productName'] = await newPage.$eval('#productTitle', el => el.textContent);
			dataObj['listPrice'] = await newPage.$eval('span.product__price', el => el.textContent);
            dataObj['description'] = await newPage.$eval('#prodDesc > div.inner > div.wag-accordion-tab-content', el => el.textContent);
			dataObj['productDimensions'] = await newPage.$eval('div.inner > div > div > div.wag-accordion-shipping-content.mb20.ml20 > p.universal-product-inches', el => el.textContent);
			dataObj['imageUrls'] = await newPage.$eval('#productImg', img => img.src);
			dataObj['productUPC'] = await newPage.$eval('div.inner > div > div > div.wag-accordion-shipping-content.mb20.ml20 > p.universal-Item-code', el => el.textContent);
            dataObj['sourceURL'] = await newPage.url('', el => el.textContent);
			resolve(dataObj);
			await newPage.close();
		});

		for(link in urls){
			let currentPageData = await pagePromise(urls[link]);
			scrapedData.push(currentPageData);
			console.log(currentPageData);
		}
		const data = JSON.stringify(scrapedData, null, 2)
		fs.writeFile("data.json", data, 'utf8', function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The data has been scraped and saved successfully! View it at './data.json'");
		});	
	}

}


module.exports = scraperObject;