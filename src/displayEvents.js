const chalk = require('chalk');
const terminalLink = require('terminal-link');

const strings = require('./strings.json');

const dateAssesor = require('./dateAssesor');
const generateGoogleCalendarLink = require('./calendarLinkGenerator');

const displayEvents = (events) => {
	let pageHasEventsToDisplay = false;
	try {
		for (let i = 0; i < events.recurringEvents.descriptions.length; i++) {
			let j = i + 1;

			console.log(`${chalk.underline('Title:')} ${events.recurringEvents.titles[i]}`);
			console.log(`${chalk.underline('Description:')} ${events.recurringEvents.descriptions[i]}`);

			if (i === 0) {
				console.log(`${chalk.underline('Date:')} ${events.recurringEvents.dates[i]} & ${events.recurringEvents.dates[j]}`);
			} else {
				console.log(`${chalk.underline('Date:')} ${events.recurringEvents.dates[i * 2]} & ${events.recurringEvents.dates[i * 2 + 1]}`);
			}
			console.log(
				chalk.blue(
					chalk.underline(
						terminalLink('Link to the event', 'https://facebook.com' + events.recurringEvents.link[i])
					)
				)
			);
			console.log('\n');

			pageHasEventsToDisplay = true;
		}

		for (let i = 0; i < events.pastAndUpcoming.titles.length; i++) {
			const shouldEventBeDisplayed = dateAssesor(events.pastAndUpcoming.dates[i]);

			if (shouldEventBeDisplayed) {
				console.log(`${chalk.underline('Title:')} ${events.pastAndUpcoming.titles[i]}`);
				console.log(`${chalk.underline('Date:')} ${events.pastAndUpcoming.dates[i]}`);
				console.log(
					chalk.blue(
						chalk.underline(
							terminalLink('Link to the event', 'https://facebook.com' + events.pastAndUpcoming.link[i])
						), ' | ',
						terminalLink('Add to your Google Calendar', generateGoogleCalendarLink(events.pastAndUpcoming.titles[i], events.pastAndUpcoming.dates[i]))
					)
				);
				console.log('\n');

				pageHasEventsToDisplay = true;
			}
		}
	} catch (err) {
		console.log(err);
	}

	if (!pageHasEventsToDisplay) {
		console.log(`${strings.english.success.noPageToDisplay}
		`);
	}
};

module.exports = displayEvents;
