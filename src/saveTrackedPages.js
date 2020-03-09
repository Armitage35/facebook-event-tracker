const fs = require('fs');
const pathToSavedPages = './pages.csv';
const strings = require('./strings.json');

const settings = require('./appSettings');

const saveTrackedPages = () => {
	let formattedPages = settings.pages.toString().replace(/\n/g, '');

	fs.writeFile(pathToSavedPages, formattedPages, function(err) {
		if (err) {
			return console.log(strings.english.error.standard);
		}
	});
};

module.exports = saveTrackedPages;
