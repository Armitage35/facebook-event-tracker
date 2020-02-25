const dateAssesor = (dateToConvert) => {
	const facebookDates = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	const month = facebookDates.indexOf(dateToConvert.substring(0,3));
	const day = dateToConvert.substring(3);
	const date = new Date(new Date().getFullYear(), month, day);

	const isPastEvent = new Date() > date; // check if date is in the past
	const isSoonEvent = new Date().getMonth() + 3 - date.getMonth(); // check if event occurs in less than 3 month

	const result = isSoonEvent >= 0 && isSoonEvent <= 3 && !isPastEvent ? true : false;

	return result;
};

module.exports = dateAssesor;
