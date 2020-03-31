const restructurePage = require('./restructurePage');

test('Asses that we only save a Facebook event page', () => {
	const perferctURL = restructurePage('https://www.facebook.com/pg/0gravite/events/');
	expect(perferctURL).toBe(perferctURL);

	const missingSlash = restructurePage('https://www.facebook.com/pg/0gravite/events');
	expect(missingSlash).toBe(('https://www.facebook.com/pg/0gravite/events/'));

	const missingEvent = restructurePage('https://www.facebook.com/pg/0gravite/');
	expect(missingEvent).toBe('https://www.facebook.com/pg/0gravite/events/');

	const lazyUrl = restructurePage('https://www.facebook.com/pg/0gravite');
	expect(missingEvent).toBe('https://www.facebook.com/pg/0gravite/events/');
});
