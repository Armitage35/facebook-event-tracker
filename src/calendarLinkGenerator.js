const dateConvertor = require('./dateConvertor');

const generateGoogleCalendarLink = (rawName, rawDate, rawPlace) => {
	const eventName = encodeURI(rawName);
	let eventDate = dateConvertor(rawDate);

	const eventMonth = eventDate.getMonth() + 1;
	const eventDay = eventDate.getDate();

	// The +1 below is required to make Google understand this is a full day event
	eventDate = `${eventDate.getFullYear()}${addAZero(eventMonth)}${addAZero(eventDay)}/${eventDate.getFullYear()}${addAZero(eventMonth)}${addAZero(eventDay) + 1}`;

	const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${eventDate}&location=${encodeURI(rawPlace)}`;

	return link;
};

// This method is required to reflect the fact that Google calendar will only accept dates with two digits
const addAZero = (valueToEvaluate) => {
	if (valueToEvaluate < 10) {
		valueToEvaluate = `0${valueToEvaluate}`;
	}

	return valueToEvaluate;
};

module.exports = generateGoogleCalendarLink;
