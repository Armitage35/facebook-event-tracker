const inquirer = require('inquirer');
const strings = require('../strings.json');

const crawlFacebook = require('../crawlFacebook');
const saveTrackedPages = require('../saveTrackedPages');

const settings = require('../appSettings');

// eslint-disable-next-line no-useless-escape
const isFacebook = /(http(s)?:\/\/.)?(www\.)?[facebook.com]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/\/=]*)/; // lgtm [js/regex/duplicate-in-character-class]

const addPagesToFollow = () => {
	inquirer.prompt([{
		type: 'input',
		name: 'pages',
		message: strings.english.welcomeWizzard.addPages.question,
		validate: function (value) {
			let pass = value.match(isFacebook);// lgtm [js/regex/duplicate-in-character-class]
			if (pass) {
				return true;
			} else {
				return strings.english.welcomeWizzard.addPages.inputValidation;
			}
		}
	}]).then(answers => {
		settings.pages = [...settings.pages, answers.pages];
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
