const inquirer = require('inquirer');
const strings = require('../strings.json');

const saveTrackedPages = require('../saveTrackedPages');
const addAdditionalPagesToFollow = require('./addAdditionalPagesToFollow');

const settings = require('../appSettings');

const addPagesToFollow = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'pages',
				message: strings.english.welcomeWizzard.addPages.question,
				validate: function(value) {
					let pass = value.match(
						/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/ //lgtm [js/regex/duplicate-in-character-class]
					);
					if (pass) {
						return true;
					} else {
						return strings.english.welcomeWizzard.addPages
							.inputValidation;
					}
				},
			},
		])
		.then(answers => {
			settings.pages = [...settings.pages, answers.pages];
			saveTrackedPages();
			addAdditionalPagesToFollow();
		});
};

module.exports = addPagesToFollow;
