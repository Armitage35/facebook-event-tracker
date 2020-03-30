const dateConvertor = (dateToConvert) => {
	const facebookDates = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	const month = facebookDates.indexOf(dateToConvert.substring(0,3));
	const day = dateToConvert.substring(3);
	const date = new Date(new Date().getFullYear(), month, day);

	return date;
};

module.exports = dateConvertor;
