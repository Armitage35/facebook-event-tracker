const settings = require('./appSettings');

const dateAssesor = (dateToConvert) => {
	const facebookDates = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	const month = facebookDates.indexOf(dateToConvert.substring(0,3));
	const day = dateToConvert.substring(3);
	const date = new Date(new Date().getFullYear(), month, day);

	const isPastEvent = new Date() > date; // check if date is in the past
	const monthDelta = new Date().getMonth() - date.getMonth();

	return monthDelta >= 0 && monthDelta <= settings.maxMonthInFuture && !isPastEvent;
};

module.exports = dateAssesor;
