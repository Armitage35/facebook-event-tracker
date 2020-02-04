const puppeteer = require('puppeteer');
// const terminalLink = require('terminal-link');
// const chalk = require('chalk');

const parallel = 4;
const pages = ['https://www.facebook.com/0gravite/events'];

const crawlFacebook = async (pages, parallel) => {

	console.log('Crawling launched 🚀' + '\n');

	// eslint-disable-next-line no-unused-vars
	let k = 0;

	for (let i = 0; i < pages.length; i += parallel) {
		k++;

		const browser = await puppeteer.launch();
		const context = await browser.createIncognitoBrowserContext();
		const page = await context.newPage();
		page.setJavaScriptEnabled(false);

		const promises = [];
		for (let j = 0; j < parallel; j++) {
			let elem = i + j;

			if (pages[elem] != undefined) {
				promises.push(browser.newPage().then(async page => {
					try {
						await page.goto(pages[elem]);
						const pageTitle = await page.title();

						await page.screenshot({
							path: elem + ' ' + pageTitle + '.png'
						}).then(console.log('🤞 I have kept my promise to screenshot ' + pages[elem]));
					} catch (err) {
						console.log('❌ Sorry! I couldn\'t keep my promise to screenshot ' + pages[elem]);
					}
				}));
			}
		}

		// await promise all and close browser
		await Promise.all(promises);
		await browser.close();
	}

	console.log('\n' + 'Crawling completed 👍');
};

crawlFacebook(pages, parallel);

// // Functions on recurring events
// (async () => {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();
// 	await page.goto(myPage);

// 	let events = {};

// 	events.titles = await page.evaluate(
// 		() => {
// 			[...document.querySelectorAll('._2l3f')].map(elem => elem.innerText.replace(/\n/g, ''));
// 		}
// 	);

// 	events.descriptions = await page.evaluate(
// 		() => [...document.querySelectorAll('._4etw')].map(elem => elem.innerText.replace(/\n/g, '').replace('More',''))
// 	);

// 	// todo: display every dates for this event. Not just the first one
// 	events.dates = await page.evaluate(
// 		() => [...document.querySelectorAll('._5x8v')].map(elem => elem.innerText.replace(/\n/g, ''))
// 	);

// 	events.link = await page.evaluate(
// 		() => [...document.querySelectorAll('._1b-b > a')].map(elem => elem.getAttribute('href'))
// 	);

// 	// Counts how many recurring events there are in the page
// 	const recurringEventCount = await page.evaluate(
// 		() => [...document.querySelectorAll('._j6k')].map(elem => elem.innerHTML)
// 	);

// 	console.log(recurringEventCount.length);

// 	// displayEvents(events);

// 	await browser.close();
// })();

// const displayEvents = (events) => {
// 	for (let i = 0; i < events.titles.length; i++){
// 		console.log('Title: ' + events.titles[i]);
// 		console.log('Description: ' + events.descriptions[i]);
// 		console.log('Date: ' + events.dates[i]);
// 		console.log(
// 			chalk.blue(
// 				chalk.underline(
// 					terminalLink('Link to the event', 'https://facebook.com' + events.link[i])
// 				)
// 			)
// 		);
// 		console.log('\n');
// 	}
// };
