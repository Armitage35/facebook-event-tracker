const dateConvertor = require('../dateUtils/dateConvertor');
const addAZero = require('../utils/addAZero');

const generateGoogleCalendarLink = (rawName, rawDate, rawPlace) => {
	let eventDate = dateConvertor(rawDate);
	const eventName = encodeURI(rawName);
	const eventMonth = eventDate.getMonth() + 1;
	const eventDay = eventDate.getDate();
	const eventPlace = encodeURI(rawPlace);


	// The +1 below is required to make Google understand this is a full day event
	eventDate = `${eventDate.getFullYear()}${addAZero(eventMonth)}${addAZero(eventDay)}/${eventDate.getFullYear()}${addAZero(eventMonth)}${addAZero(eventDay) + 1}`;

	const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${eventDate}&location=${eventPlace}`;

	return link;
};

module.exports = generateGoogleCalendarLink;
