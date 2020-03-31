const settings = require('../appSettings');

const dateConvertor = (dateToConvert) => {
	const month = settings.facebookDates.indexOf(dateToConvert.substring(0,3));
	const day = dateToConvert.substring(3);
	const date = new Date(new Date().getFullYear(), month, day);

	return date;
};

module.exports = dateConvertor;
