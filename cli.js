const inquirer = require('inquirer');
const fs = require('fs');

const crawlFacebook = require('./src/crawlFacebook');

const parallel = 4;
const strings = require('./src/strings.json');
const pathToSavedPages = './src/pages.csv';

let pages = [];

const intializeApp = () => {
	if (fs.existsSync(pathToSavedPages)) {
		pages = fs.readFile(pathToSavedPages, 'utf8', function(err, contents) {
			if (err) console.log(err);
			pages = contents.split(',');
			welcomeUser();
		});
	} else {
		fs.writeFile(pathToSavedPages, '', function(err) {
			if (err) {
				console.log(strings.english.error.standard);
			}
			console.log(strings.english.onboarding);
			addPagesToFollow();
		});
	}
};

const saveTrackedPages = () => {
	let formattedPages = pages.toString().replace(/\n/g, '');

	fs.writeFile(pathToSavedPages, formattedPages, function(err) {
		if (err) {
			return console.log(strings.english.error.standard);
		}
	});
};

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
				crawlFacebook(pages, parallel);
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

const addPagesToFollow = () => {
	inquirer.prompt([{
		type: 'input',
		name: 'pages',
		message: strings.english.welcomeWizzard.addPages.question,
		validate: function (value) {
			let pass = value.match(
				/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/
			);
			if (pass) {
				return true;
			} else {
				return strings.english.welcomeWizzard.addPages.inputValidation;
			}
		}
	}]).then(answers => {
		pages = [...pages, answers.pages];
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
			crawlFacebook(pages, parallel);
		}
	});
};

const removePages = () => {
	inquirer.prompt([{
		type: 'list',
		name: 'nextStep',
		message: strings.english.welcomeWizzard.removePages.question,
		choices: pages
	}]).then(answers => {
		pages.splice(pages.indexOf(answers.nextStep),1);
		saveTrackedPages();
		welcomeUser();
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
			pages = [];
			console.log(strings.english.welcomeWizzard.resetPreferences.confirmation);
			welcomeUser();
		} else {
			console.log(strings.english.welcomeWizzard.resetPreferences.cancel);
			saveTrackedPages();
			welcomeUser();
		}
	});
};

intializeApp();
