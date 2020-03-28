const path = require('path');

const settings = {
	parallel : 4, // handles how many tabs Chrome will open at once
	pages : [],
	pathToSavedPages : path.join(__dirname, 'pages.csv'),
	maxMonthInFuture: 3
};

module.exports = settings;
