const puppeteer = require('puppeteer');
const terminalLink = require('terminal-link');
const chalk = require('chalk');
const ora = require('ora');
const clear = require('clear');
const inquirer = require('inquirer');
const fs = require('fs');

const parallel = 4;
const strings = require('./src/strings.json');


let pages = fs.readFile('./src/pages.csv', 'utf8', function(err, contents) {
	if(err) console.log(err);
	pages = contents.split(',');
});

const welcomeUser = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'welcome',
		message: strings.english.welcomeWizzard.welcome.question,
		choices: strings.english.welcomeWizzard.welcome.answers
	}])
		.then(answers => {
			if (answers.welcome === strings.english.welcomeWizzard.welcome.answers[1]) {
				askForPreferences();
			} else {
				crawlFacebook(pages, parallel);
			}
		});
};

const askForPreferences = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'preferences',
		message: strings.english.welcomeWizzard.preferencePanel.question,
		choices: strings.english.welcomeWizzard.preferencePanel.answers
	}]).then(answers => {
		if (answers.preferences === strings.english.welcomeWizzard.preferencePanel.answers[1]) {
			addPagesToFollow();
		} else if (answers.preferences === strings.english.welcomeWizzard.preferencePanel.answers[0]) {
			pages = [];
			addPagesToFollow();
		} else {
			removePages();
		}
	});
};

const addPagesToFollow = () => {
	inquirer.prompt([{
		type: 'input',
		name: 'pages',
		message: strings.english.welcomeWizzard.addPages.question,
		validate: function (value) {
			let pass = value.match(
				/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/
			);
			if (pass) {
				return true;
			} else {
				return strings.english.welcomeWizzard.addPages.inputValidation;
			}
		}
	}]).then(answers => {
		pages = [...pages, answers.pages];
		addAdditionalPagesToFollow();
	});
};

const addAdditionalPagesToFollow = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'nextStep',
		message: strings.english.welcomeWizzard.addPages.nextStep.question,
		choices: strings.english.welcomeWizzard.addPages.nextStep.answers,
		filter: function (val) {
			return val.toLowerCase();
		}
	}]).then(answers => {
		if (answers.nextStep === strings.english.welcomeWizzard.addPages.nextStep.answers[0]) {
			addPagesToFollow();
		} else {
			console.log(pages);
			crawlFacebook(pages, parallel);
		}
	});
};

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

const removePages = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'nextStep',
		message: strings.english.welcomeWizzard.removePages.question,
		choices: pages
	}]).then(answers => {
		pages.splice(pages.indexOf(answers.nextStep),1);
		welcomeUser();
	});
};

const displayEvents = (events) => {
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

welcomeUser();
