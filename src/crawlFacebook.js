const chalk = require('chalk');
const clear = require('clear');
const ora = require('ora');
const puppeteer = require('puppeteer');

const displayEvents = require('./displayEvents');
const strings = require('./strings.json');

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
			pageName: '',
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

						events.pageName = await page.title();

						events.pageName = events.pageName.replace(' - Events | Facebook', '');

						console.log(chalk.bold(events.pageName + '\n'));
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
	}

	console.log('\n' + strings.english.success.crawlingCompleted);
};

module.exports = crawlFacebook;
