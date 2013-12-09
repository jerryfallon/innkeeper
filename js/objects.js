var Items = {
	drink: {
		ale: { cost: 8 },
		mead: { cost: 13 },
		wine: { cost: 21 }
	},
	food: {
		bread: { cost: 5 },
		meat: { cost: 11 },
		salad: { cost: 18 }
	},
	entertainment: {
		poet: { cost: 11 },
		minstrel: { cost: 19 },		
		jester: { cost: 26 }
	}
};

var Visitors = {
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
			}
		}
	}
};