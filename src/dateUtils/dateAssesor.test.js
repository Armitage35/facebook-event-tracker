const dateAssesor = require('./dateAssesor');
const addAZero = require('../utils/addAZero');
const settings = require('../appSettings');


test('Asses date to decide whether or not to display them', () => {
	const dateToDisplay = dateAssesor(goodDateGenerator());
	expect(dateToDisplay).toBe(true);
	const dateToHide = dateAssesor(badDateGenerator());
	expect(dateToHide).toBe(false);
});

const facebookDateGenerator = (jsDate) => {

	let facebookDate = addAZero(jsDate.getDate());
	let facebookMonth = addAZero(settings.facebookDates[jsDate.getMonth()]);

	return `${facebookMonth}${facebookDate}`;
};

const badDateGenerator = () => {
	let badDate = new Date();

	badDate.setDate(badDate.getDate() - (settings.maxMonthInFuture + 1) * 30); // generates a date 4 month in the past

	return facebookDateGenerator(badDate);
};

const goodDateGenerator = () => {
	let goodDate = new Date();

	goodDate.setDate(goodDate.getDate() + (settings.maxMonthInFuture - 1) * 30); // generates a date 2 month in the past

	return facebookDateGenerator(goodDate);
};
