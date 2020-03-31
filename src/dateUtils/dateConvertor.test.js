const dateConvertor = require('./dateConvertor');

test('Converts Facebook date into JS date', () => {
	const JSDate = dateConvertor('MAR25');
	expect(JSDate).toStrictEqual(new Date(2020, 2, 25));
});
