const axios = require('axios');
const cheerio = require('cheerio');
const browserObject = require('./browser');

//get request to walgreens
axios
    .get('https://www.walgreens.com/')
    .then((response) => {
        // Exact HTML content is stored inside `data` field
       const $ = cheerio.load(response.data)
    })
    .catch((error) => {
        console.error(error)
    });