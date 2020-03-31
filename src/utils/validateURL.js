const validateURL = (expressionToTest) => {
	const regex = RegExp(/(http(s)?:\/\/.)?(www\.)?(facebook)\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/);
	const isFacebook = regex.test(expressionToTest);

	return isFacebook;
};

module.exports = validateURL;
