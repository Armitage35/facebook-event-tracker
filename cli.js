const puppeteer = require('puppeteer');
const terminalLink = require('terminal-link');
const chalk = require('chalk');
const ora = require('ora');
const clear = require('clear');

const facebookConfiguration = require('./src/facebookConfig');

const parallel = 1;
// Todo: display the page's name before displaying the results
const pages = ['https://www.facebook.com/0gravite/events', 'https://www.facebook.com/pg/brasserieboswell/events'];



const crawlFacebook = async (pages, parallel) => {
	clear();

	const spinner = ora('Crawling launched 🚀').start();
	setTimeout(() => {
		spinner.color = 'blue';
		spinner.text = 'Crawling launched 🚀' + '\n';
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

						// todo: clean this shit up
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

						clear();
						console.log(await page.title() + '\n');
						spinner.stop();
						displayEvents(events);

					} catch (err) {
						// console.log(err);
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
	// todo: clean this shit up
	try {
		for (let i = 0; i < events.recurringEvents.descriptions.length; i++) {
			let j = i + 1;

			console.log(chalk.underline('Title:') + ' ' + events.recurringEvents.titles[i]);
			console.log(chalk.underline('Description:') + ' ' + events.recurringEvents.descriptions[i]);
			if (i === 0) {
				console.log(chalk.underline('Date:') + ' ' + events.recurringEvents.dates[i] + ' & ' + events.recurringEvents.dates[j]);
			} else {
				console.log(chalk.underline('Date:') + ' ' + events.recurringEvents.dates[i * 2] + ' & ' + events.recurringEvents.dates[i * 2 + 1]);
			}
			console.log(
				chalk.blue(
					chalk.underline(
						terminalLink('Link to the event', 'https://facebook.com' + events.recurringEvents.link[i])
					)
				)
			);
			console.log('\n');
		}

		for (let i = 0; i < events.pastAndUpcoming.titles.length; i++) {
			console.log(chalk.underline('Title:') + ' ' + events.pastAndUpcoming.titles[i]);
			console.log(chalk.underline('Date:') + ' ' + events.pastAndUpcoming.dates[i]);
			console.log(
				chalk.blue(
					chalk.underline(
						terminalLink('Link to the event', 'https://facebook.com' + events.pastAndUpcoming.link[i])
					)
				)
			);
			console.log('\n');
		}
	} catch (err) {
		console.log(err);
	}
};
