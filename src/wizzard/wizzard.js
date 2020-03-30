const inquirer = require('inquirer');

const settings = require('../appSettings');
const strings = require('../strings.json');

const addPagesToFollow = require('./addPagesToFollow');
const crawlFacebook = require('../crawlFacebook');
const saveTrackedPages = require('../saveTrackedPages');

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
				crawlFacebook(settings.pages, settings.parallel);
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
		switch (answers.preferences) {
		case strings.english.welcomeWizzard.preferencePanel.answers[0]:
			resetPreferences();
			break;
		case strings.english.welcomeWizzard.preferencePanel.answers[1]:
			addPagesToFollow();
			break;
		case strings.english.welcomeWizzard.preferencePanel.answers[2]:
			removePages();
			break;
		default:
			console.log(strings.english.error.standard);
		}
	});
};

const resetPreferences = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'confirmation',
		message: strings.english.welcomeWizzard.resetPreferences.question,
		choices: strings.english.welcomeWizzard.resetPreferences.answers,
	}]).then(answers => {
		if (answers.confirmation === strings.english.welcomeWizzard.resetPreferences.answers[0]) {
			settings.pages = [];
			console.log(strings.english.welcomeWizzard.resetPreferences.confirmation);
			welcomeUser();
		} else {
			console.log(strings.english.welcomeWizzard.resetPreferences.cancel);
			saveTrackedPages();
			welcomeUser();
		}
	});
};

const removePages = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'nextStep',
		message: strings.english.welcomeWizzard.removePages.question,
		choices: settings.pages
	}]).then(answers => {
		settings.pages.splice(settings.pages.indexOf(answers.nextStep),1);
		saveTrackedPages();
		welcomeUser();
	});
};

module.exports = welcomeUser;
