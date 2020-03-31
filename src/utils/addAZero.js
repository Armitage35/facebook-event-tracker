// This method is required to reflect the fact that Google calendar will only accept dates with two digits
const addAZero = (valueToEvaluate) => {
	if (valueToEvaluate < 10) {
		valueToEvaluate = `0${valueToEvaluate}`;
	}

	return valueToEvaluate;
};

module.exports = addAZero;
