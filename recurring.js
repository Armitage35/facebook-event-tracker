const puppeteer = require('puppeteer');
const terminalLink = require('terminal-link');

const myPage = 'https://www.facebook.com/0gravite/events';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(myPage);

	const eventTitles = await page.evaluate(
		() => [...document.querySelectorAll('._2l3f')].map(elem => elem.innerText.replace(/\n/g, ''))
		);

	const eventDescriptions = await page.evaluate(
		() => [...document.querySelectorAll('._4etw')].map(elem => elem.innerText.replace(/\n/g, '').replace('More',''))
	);

	// todo: display every dates for this event. Not just the first one
	const eventDates = await page.evaluate(
		() => [...document.querySelectorAll('._5x8v')].map(elem => elem.innerText.replace(/\n/g, ''))
	);

	const eventLink = await page.evaluate(
		() => [...document.querySelectorAll('._1b-b > a')].map(elem => elem.getAttribute('href'))
	);

	for (let i = 0; i < eventTitles.length; i++){
		console.log('Title: ' + eventTitles[i]);
		console.log('Description: ' + eventDescriptions[i]);
		console.log('Date: ' + eventDates[i]);
		console.log(terminalLink('Link to the event:', 'https://facebook.com/' + eventLink[i]));
	}

	await browser.close();
})();
