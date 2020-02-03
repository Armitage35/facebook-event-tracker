const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.facebook.com/pg/brasserieboswell/events');
	page.once('load', () => console.log('Page loaded!'));
	const innerHTML = await page.evaluate(() => document.querySelector('#upcoming_events_card').textContent);
	console.log(innerHTML);

	await browser.close();
})();
