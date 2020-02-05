const puppeteer = require('puppeteer');
const terminalLink = require('terminal-link');
const chalk = require('chalk');

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

		let events = {};

		const promises = [];

		for (let j = 0; j < parallel; j++) {
			let elem = i + j;

			if (pages[elem] != undefined) {
				promises.push(browser.newPage().then(async page => {
					try {
						await page.goto(pages[elem]);

						events.titles = await page.evaluate(
							() => [...document.querySelectorAll('._2l3f')].map(elem => elem.innerText.replace(/\n/g, ''))
						);

						events.descriptions = await page.evaluate(
							() => [...document.querySelectorAll('._4etw')].map(elem => elem.innerText.replace(/\n/g, '').replace('More', ''))
						);

						events.dates = await page.evaluate(
							() => [...document.querySelectorAll('._5x8v')].map(elem => elem.innerText.replace(/\n/g, ''))
						);

						events.link = await page.evaluate(
							() => [...document.querySelectorAll('._1b-b > a')].map(elem => elem.getAttribute('href'))
						);

						displayEvents(events);
						// console.log(events);

					} catch (err) {
						console.log('\n' + '❌ Sorry! I couldn\'t keep parse this page');
					}
				}));
			}
		}

		await Promise.all(promises);
		await browser.close();
	}

	console.log('\n' + 'Crawling completed 👍');
};

crawlFacebook(pages, parallel);

const displayEvents = (events) => {

	try {
		for (let i = 0; i < events.descriptions.length; i++) {
			let j = i + 1;

			console.log(chalk.underline('Title:') + ' ' + events.titles[i]);
			console.log(chalk.underline('Description:') + ' ' + events.descriptions[i]);
			if (i === 0) {
				console.log(chalk.underline('Date:') + ' ' + events.dates[i] + ' & ' + events.dates[j]);
			} else {
				console.log(chalk.underline('Date:') + ' ' + events.dates[i * 2] + ' & ' + events.dates[i * 2 + 1]);
			}
			console.log(
				chalk.blue(
					chalk.underline(
						terminalLink('Link to the event', 'https://facebook.com' + events.link[i])
					)
				)
			);
			console.log('\n');
		}
	} catch (err) {
		console.log(err);
	}
};
