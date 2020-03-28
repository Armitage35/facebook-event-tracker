const fs = require('fs');
const strings = require('./strings.json');

const settings = require('./appSettings');

const welcomeUser = require('./wizzard/welcomeUser');
const addPagesToFollow = require('./wizzard/addPagesToFollow');

const intializeApp = () => {
	if (fs.existsSync(settings.pathToSavedPages)) {
		settings.pages = fs.readFile(settings.pathToSavedPages, 'utf8', function(err, contents) {
			if (err) console.log(err);
			settings.pages = contents.split(',');
			welcomeUser();
		});
	} else {
		fs.writeFile(settings.pathToSavedPages, '', function(err) {
			if (err) {
				console.log(strings.english.error.standard);
			}
			console.log(strings.english.onboarding);
			addPagesToFollow();
		});
	}
};

module.exports = intializeApp;
