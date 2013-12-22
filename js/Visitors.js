function Visitors() {
	this.list = {
		elf: {
			preferences: {
				drink: {
					ale: 'hate',
					mead: 'neutral',
					wine: 'love'
				},
				food: {
					bread: 'neutral',
					meat: 'hate',
					salad: 'love'
				},
				entertainment: {
					poet: 'love',
					minstrel: 'neutral',
					jester: 'hate'
				},
				staff: {
					orphan: 'love',
					hag: 'hate',
					barmaid: 'neutral'
				}
			}
		},
		barbarian: {
			preferences: {
				drink: {
					ale: 'neutral',
					mead: 'love',
					wine: 'hate'
				},
				food: {
					bread: 'neutral',
					meat: 'love',
					salad: 'hate'
				},
				entertainment: {
					poet: 'hate',
					minstrel: 'neutral',
					jester: 'love'
				},
				staff: {
					orphan: 'hate',
					hag: 'love',
					barmaid: 'neutral'
				}
			}
		},
		townsfolk: {
			preferences: {
				drink: {
					ale: 'love',
					mead: 'hate',
					wine: 'neutral'
				},
				food: {
					bread: 'love',
					meat: 'neutral',
					salad: 'hate'
				},
				entertainment: {
					poet: 'neutral',
					minstrel: 'love',
					jester: 'hate'
				},
				staff: {
					orphan: 'neutral',
					hag: 'hate',
					barmaid: 'love'
				}
			}
		},
		noble: {
			preferences: {
				drink: {
					ale: 'hate',
					mead: 'neutral',
					wine: 'love'
				},
				food: {
					bread: 'neutral',
					meat: 'love',
					salad: 'hate'
				},
				entertainment: {
					poet: 'hate',
					minstrel: 'neutral',
					jester: 'love'
				},
				staff: {
					orphan: 'hate',
					hag: 'neutral',
					barmaid: 'love'
				}
			}
		}
	};
}