const axios = require('axios');
const cheerio = require('cheerio');
const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)




//get request to walgreens
// axios
//     .get('https://www.walgreens.com/')
//     .then((response) => {
//         // Exact HTML content is stored inside `data` field
//        const $ = cheerio.load(response.data)
//     })
//     .catch((error) => {
//         console.error(error)
//     });