const fs = require('fs');
const strings = require('./strings.json');

const settings = require('./appSettings');

const wizzard = require('./wizzard/wizzard');
const addPagesToFollow = require('./wizzard/addPagesToFollow');

const intializeApp = () => {
	if (fs.existsSync(settings.pathToSavedPages)) {
		settings.pages = fs.readFile(settings.pathToSavedPages, 'utf8', function(err, contents) {
			if (err) {
				console.log(err);
			} else {
				settings.pages = contents.split(',');
				wizzard();
			}
		});
	} else {
		fs.writeFile(settings.pathToSavedPages, '', function(err) {
			if (err) {
				console.log(err);
			}
			console.log(strings.english.onboarding);
			addPagesToFollow();
		});
	}
};

module.exports = intializeApp;
