const inquirer = require('inquirer');
const strings = require('../strings.json');

const settings = require('../appSettings');

const welcomeUser = require('./welcomeUser');
const saveTrackedPages = require('../saveTrackedPages');

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

module.exports = resetPreferences;
