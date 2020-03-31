const inquirer = require('inquirer');
const strings = require('../strings.json');

const crawlFacebook = require('../crawlFacebook');
const saveTrackedPages = require('../saveTrackedPages');

const settings = require('../appSettings');

const regex = /(http(s)?:\/\/.)?(www\.)?(facebook)\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

const addPagesToFollow = () => {
	inquirer.prompt([{
		type: 'input',
		name: 'pages',
		message: strings.english.welcomeWizzard.addPages.question,
		validate: function (value) {
			const isFacebook = value.match(regex);

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

const restructurePage = (sourceUrl) => {
	let updatedUrl = sourceUrl;

	if (!updatedUrl.endsWith('/')) {
		updatedUrl = `${updatedUrl}/`;
	}

	if (!updatedUrl.endsWith('events/') && !updatedUrl.endsWith('events')) {
		updatedUrl = `${updatedUrl}events/`;
	}

	return updatedUrl;
};

module.exports = addPagesToFollow;
