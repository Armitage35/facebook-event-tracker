const addAZero = require('./addAZero');

test('Asses that a zero is added when number is below 10', () => {
	const above10 = addAZero(11);
	expect(above10).toBe(11);
	const below10 = addAZero(5);
	expect(below10).toBe('05');
});
