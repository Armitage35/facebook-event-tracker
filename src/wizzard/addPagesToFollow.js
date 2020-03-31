const inquirer = require('inquirer');

const crawlFacebook = require('../crawlFacebook');
const validateURL = require('../utils/validateURL');
const restructurePage = require('../utils/restructurePage');
const saveTrackedPages = require('../saveTrackedPages');
const strings = require('../strings.json');

const settings = require('../appSettings');

const addPagesToFollow = () => {
	inquirer.prompt([{
		type: 'input',
		name: 'pages',
		message: strings.english.welcomeWizzard.addPages.question,
		validate: function (value) {
			const isFacebook = validateURL(value);

			if (isFacebook) {
				return true;
			} else {
				return strings.english.welcomeWizzard.addPages.inputValidation;
			}
		}
	}]).then(answers => {
		const updatedPage = restructurePage(answers.pages);

		settings.pages = [...settings.pages, updatedPage];
		saveTrackedPages();
		addAdditionalPagesToFollow();
	});
};

const addAdditionalPagesToFollow = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'nextStep',
		message: strings.english.welcomeWizzard.addPages.nextStep.question,
		choices: strings.english.welcomeWizzard.addPages.nextStep.answers
	}]).then(answers => {
		if (answers.nextStep === strings.english.welcomeWizzard.addPages.nextStep.answers[0]) {
			addPagesToFollow();
		} else {
			crawlFacebook(settings.pages, settings.parallel);
		}
	});
};

module.exports = addPagesToFollow;
