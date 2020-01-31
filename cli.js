const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.facebook.com/0gravite/events/?ref=page_internal');
	page.once('load', () => console.log('Page loaded!'));
	const innerHTML = await page.evaluate(() => document.querySelector('#recurring_events_card').innerHTML);
	console.log(innerHTML);
	await page.screenshot({path: 'screenshots/example.png'});

	await browser.close();
})();
