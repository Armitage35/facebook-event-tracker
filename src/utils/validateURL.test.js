const validateURL = require('./validateURL');

test('Asses that we properly filter out garbage URL', () => {
	const goodURL = validateURL('https://www.facebook.com/pg/0gravite/events/');
	expect(goodURL).toBe(true);

	const decentURL = validateURL('facebook.com/pg/0gravite/events/');
	expect(decentURL).toBe(true);

	const badURL = validateURL('yolo.fr');
	expect(badURL).toBe(false);
});
