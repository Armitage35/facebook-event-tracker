const settings = require('../appSettings');
const dateConvertor = require('./dateConvertor');

const dateAssesor = (dateToAssess) => {
	const date = dateConvertor(dateToAssess);

	const isPastEvent = new Date() > date; // check if date is in the past
	const monthDelta = date.getMonth() - new Date().getMonth() ;

	return monthDelta >= 0 && monthDelta <= settings.maxMonthInFuture && !isPastEvent;
};

module.exports = dateAssesor;
