const fs = require('fs');
const settings = require('./appSettings');
const strings = require('./strings.json');

const addPagesToFollow = require('./wizzard/addPagesToFollow');
const wizzard = require('./wizzard/wizzard');

const generateGoogleCalendarLink = require('./calendarLinkGenerator');

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

// console.log(generateGoogleCalendarLink('name', '20190227T104500/20190227T104500', 'location'));

module.exports = intializeApp;
