const puppeteer = require('puppeteer');
const clear = require('clear');
const chalk = require('chalk');
const ora = require('ora');

const strings = require('./strings.json');
const displayEvents = require('./displayEvents');

const crawlFacebook = async (pages, parallel) => {
	clear();

	const spinner = ora(strings.english.success.crawlingStarted).start();
	setTimeout(() => {
		spinner.color = 'blue';
		spinner.text =`${strings.english.success.crawlingStarted}\n`;
	}, 1000);

	for (let i = 0; i < pages.length; i += parallel) {

		const browser = await puppeteer.launch();
		const context = await browser.createIncognitoBrowserContext();
		const page = await context.newPage();
		page.setJavaScriptEnabled(false);

		let events = {
			recurringEvents: {},
			pastAndUpcoming: {},
		};

		const promises = [];

		for (let j = 0; j < parallel; j++) {
			let elem = i + j;

			if (pages[elem] != undefined) {
				promises.push(browser.newPage().then(async page => {
					try {
						await page.goto(pages[elem]);

						events.recurringEvents.titles = await page.evaluate(
							() => [...document.querySelectorAll('._2l3f')].map(elem => elem.innerText.replace(/\n/g, ''))
						);

						events.recurringEvents.descriptions = await page.evaluate(
							() => [...document.querySelectorAll('._4etw')].map(elem => elem.innerText.replace(/\n/g, '').replace('More', ''))
						);

						events.recurringEvents.dates = await page.evaluate(
							() => [...document.querySelectorAll('._5x8v')].map(elem => elem.innerText.replace(/\n/g, ''))
						);

						events.recurringEvents.link = await page.evaluate(
							() => [...document.querySelectorAll('._1b-b > a')].map(elem => elem.getAttribute('href'))
						);

						events.pastAndUpcoming.titles = await page.evaluate(
							() => [...document.querySelectorAll('._50f7')].map(elem => elem.innerText.replace(/\n/g, ''))
						);

						events.pastAndUpcoming.dates = await page.evaluate(
							() => [...document.querySelectorAll('._5a5i')].map(elem => elem.innerText.replace(/\n/g, ''))
						);

						events.pastAndUpcoming.link = await page.evaluate(
							() => [...document.querySelectorAll('._4dmk > a')].map(elem => elem.getAttribute('href'))
						);

						console.log(chalk.bold(await page.title() + '\n'));
						spinner.stop();

						displayEvents(events);

					} catch (err) {
						console.log('\n' + strings.english.error.parsingError);
					}
				}));
			}
		}

		await Promise.all(promises).catch(() => {
			console.log('\n' + strings.english.error.parsingError);
		});
		await browser.close();
		console.log(events);
	}

	console.log('\n' + strings.english.success.crawlingCompleted);
};

module.exports = crawlFacebook;
