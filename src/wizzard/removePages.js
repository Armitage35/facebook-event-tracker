const inquirer = require('inquirer');
const strings = require('../strings.json');

const settings = require('../appSettings');

const welcomeUser = require('./welcomeUser');
const saveTrackedPages = require('../saveTrackedPages');

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

module.exports = removePages;
