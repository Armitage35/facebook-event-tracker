const generateGoogleCalendarLink = require('./calendarLinkGenerator');

test('Generate Google calendar link', () => {
	const link = generateGoogleCalendarLink('Méditation et thé', 'APR4', 'Zéro Gravité');
	expect(link).toBe('https://www.google.com/calendar/render?action=TEMPLATE&text=M%C3%A9ditation%20et%20th%C3%A9&dates=20200404/202004041&location=Z%C3%A9ro%20Gravit%C3%A9');
});
