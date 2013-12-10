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

var Inn = {
	//properties
	name: 'The Stickit Inn',
	inventory: {
		drink: {
			ale: 10,
			wine: 6,
			mead: 5
		},
		food: {
			bread: 0,
			meat: 5,
			salad: 10
		},
		entertainment: {
			poet: 1,
			minstrel: 5,
			jester: 2
		},
		staff: {
			barmaid: 5,
			orphan: 2,
			hag: 3
		}
	},
	capacity: 20,
	currentVisitors: [],
	rep: {
		barbarians: 20,
		elves: 0,
		humans: 0,
		dwarves: 0,
		thieves: 5,
		nobility: 10
	},

	//functions
	startNightShift: function (callbackFunctionWhenComplete) {
		console.log('starting a nightshift at ' + this.name);

		var self = this;
		var numberOfTicksPerShift = 10;
		var timeBetweenTicks = 1000;
		var currentTick = 1;

		var executeAnotherTickAsync = function () {
			if (currentTick >= numberOfTicksPerShift) {
				console.log('nightshift complete at ' + this.name);
				if (callbackFunctionWhenComplete) //if there is a callback function, call it (with 'this' pointing to the inn instance... "innstance"?)
					callbackFunctionWhenComplete.call(self);
				return;
			}

			console.log('current tick: ' + currentTick);
			self.executeOneNightShiftTick();
			++currentTick;

			setTimeout(executeAnotherTickAsync, timeBetweenTicks);
		};

		setTimeout(executeAnotherTickAsync, 0); //0 as a timeout because we don't want to block the thread during the first tick.

	},
	executeOneNightShiftTick: function (callbackWhenCompleted) {
		console.log(' starting a tick');
		var maxNewVisitors = this.capacity - this.currentVisitors.length;
		//todo: current visitors leave
		//todo: new visitors enter
		//todo: trigger events
		//todo: calculate transactions, adjust visitor satisfaction, adjust inventory
		if (callbackWhenCompleted)
			callbackWhenCompleted.call(this);

		console.log(' completed a tick');

	}
};