Web Crawler
========

This web crawler provides a convenient way to gather data about various product listings on your favorite websites such as Walgreens, Walmart, etc... This scraper is currently set to scrape and output products in the Toilet Paper section of the Household essentials category.

## Prerequisites
This application was built and tested Node.js version 14.16.0 and npm version 6.14.11. This was also tested on puppeteer version 19.4.1.

You would need to initialize npm through the below command.
```
npm init -y
```
Only one dependency is needed for this scraper. You will need to install puppeteer through the below command.

```
npm install puppeteer
```

## Execution

To execute the scraper you would need to enter the command below
```
npm run start
```

When the scraper is done executing, within the command line you press
```
Control + C
```

## Tests
You may notice that within the browser.js file I have commented out
```
headless: false
```

headless - false means the browser will run with an Interface so you can watch your script execute, while true means the browser will run in headless mode. Puppeteer by default launches the browser in headless mode.


Within the console, you should see 

```
Opening the browser......
```
whenever you have a successful browser launch.

