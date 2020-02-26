const strings = require('../strings.json');
const inquirer = require('inquirer');

const settings = require('../appSettings');

const askForPreferences = require('./askForPreferences');
const crawlFacebook = require('../crawlFacebook');

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

module.exports = welcomeUser;
