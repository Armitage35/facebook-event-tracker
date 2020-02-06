module.exports = {
	recurringEvent: {
		title: {
			selector: '._2l3f',
			destination: 'recurringEvents.titles'
		},
		description: {
			selector: '._4etw',
			destination: 'recurringEvents.descriptions'
		},
		dates: {
			selector: '._5x8v',
			destination: 'recurringEvents.link'
		},
		link: {
			selector: '._1b-b > a',
			destination: 'recurringEvents.dates'
		},
	},
	pastAndUpcomingEvents: {
		title: {
			selector: '._50f7',
			destination: 'pastAndUpcoming.titles'
		},
		dates: {
			selector: '._5a5i',
			destination: 'pastAndUpcoming.dates'
		},
		link: {
			selector: '._4dmk > a',
			destination: 'pastAndUpcoming.link'
		},
	}
};
