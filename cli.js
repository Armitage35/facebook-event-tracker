const puppeteer = require('puppeteer');
const terminalLink = require('terminal-link');

const myPage = 'https://www.facebook.com/pg/brasserieboswell/events';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(myPage);

	const eventTitles = await page.evaluate(
		() => [...document.querySelectorAll('._50f7')].map(elem => elem.innerText.replace(/\n/g, ''))
		);

	const eventDates = await page.evaluate(
		() => [...document.querySelectorAll('._5a5i')].map(elem => elem.innerText.replace(/\n/g, ''))
	);

	const eventLink = await page.evaluate(
		() => [...document.querySelectorAll('._4dmk > a')].map(elem => elem.getAttribute('href'))
	);

	for (let i = 0; i < eventTitles.length; i++){
		console.log('Title: ' + eventTitles[i]);
		console.log('Date: ' + eventDates[i]);
		console.log(terminalLink('Link to the event:', 'https://facebook.com/' + eventLink[i]));
	}

	await browser.close();
})();
