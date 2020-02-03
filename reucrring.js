const puppeteer = require('puppeteer');

const myPage = 'https://www.facebook.com/0gravite/events';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(myPage);

	const innerHTML = await page.evaluate(() => document.querySelector('#recurring_events_card').innerHTML);
	// console.log(innerHTML);

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
		console.log('Link: ' + 'https://facebook.com/' + eventLink[i] + '\n');
	}

	eventDates.forEach(element => console.log(element))

	await browser.close();
})();
