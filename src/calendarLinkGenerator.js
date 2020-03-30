const generateGoogleCalendarLink = (eventName, rawDate, eventLocation) => {
	const eventDate = rawDate;
	const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${eventDate}&location=${eventLocation}`;

	return link;
};

module.exports = generateGoogleCalendarLink;
