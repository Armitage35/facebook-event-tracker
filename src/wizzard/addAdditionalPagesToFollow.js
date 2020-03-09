const inquirer = require('inquirer');
const strings = require('../strings.json');

const addPagesToFollow = require('./addPagesToFollow');
const crawlFacebook = require('../crawlFacebook');

const settings = require('../appSettings');

const addAdditionalPagesToFollow = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'nextStep',
				message:
					strings.english.welcomeWizzard.addPages.nextStep.question,
				choices:
					strings.english.welcomeWizzard.addPages.nextStep.answers,
			},
		])
		.then(answers => {
			if (
				answers.nextStep ===
				strings.english.welcomeWizzard.addPages.nextStep.answers[0]
			) {
				addPagesToFollow();
			} else {
				crawlFacebook(settings.pages, settings.parallel);
			}
		});
};

module.exports = addAdditionalPagesToFollow;
