const inquirer = require('inquirer');
const strings = require('../strings.json');

const addPagesToFollow = require('./addPagesToFollow');
const removePages = require('./removePages');
const resetPreferences = require('./resetPreferences');

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

module.exports = askForPreferences;
