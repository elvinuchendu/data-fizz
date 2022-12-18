const axios = require('axios');
const cheerio = require('cheerio');

// console.log(2+6);
axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
        // Exact HTML content is stored inside `data` field
        console.log(response.data)
    })
    .catch((error) => {
        console.error(error)
    });