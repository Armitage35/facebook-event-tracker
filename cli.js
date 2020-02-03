const puppeteer = require('puppeteer');

const myPage = 'https://www.facebook.com/0gravite/events';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(myPage);



	await browser.close();
})();
