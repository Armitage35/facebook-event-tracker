const restructurePage = (sourceUrl) => {
	let updatedUrl = sourceUrl;

	if (!updatedUrl.endsWith('/')) {
		updatedUrl = `${updatedUrl}/`;
	}

	if (!updatedUrl.endsWith('events/') && !updatedUrl.endsWith('events')) {
		updatedUrl = `${updatedUrl}events/`;
	}

	// console.log(updatedUrl);

	return updatedUrl;
};

module.exports = restructurePage;
