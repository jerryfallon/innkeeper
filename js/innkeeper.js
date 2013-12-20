function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

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

//Event
// description
// canOccur (function or boolean)
var Events = [
	{
		id: 1,
		description: 'A hellhound has taken up residence in your basement.  And it seems HUNGRY.',
		time: 15000,
		canOccur: function (inn) {
			return true;
		},
		options: [
			{
				id: 1,
				description: 'Send an orphan to "fetch something" from the basement.  You\'re sure he and the hound will become fast friends!',
				canChoose: function (inn) {
					return true;
				},
				effect: function (inn) {
					return "The hellhound is sated for now, and probably won't cause any trouble for a few days.  Little Timmy will be forever remembered for his sacrifice.  Or was it Little Tom?  Eh, who cares.  He was just a stupid orphan!";
				},
				select: function () { //todo: refactor so that the event has a reference to the inn.  right now this is accessing a global variable.
					return this.effect(Inn);
				}
			},
			{
				id: 2,
				description: 'Go fight the hellhound.',
				canChoose: true,
				effect: function (inn) {
					return "Wow, really?  Are you sure?  Ok... you pick up your sharpest broomstick and head down to do glorious battle with a demonic creature that is like 100 levels above you.  You use broomstick.  It's not very effective.  You are eaten.  You are dead.  Game over.";
				},
				select: function () {
					return this.effect(Inn);
				}
			}
		]
	},
	{
		id: 2,
		time: 10000,
		description: 'Two dwarves complain to you that the tables are too high for them to sit comfortably.  They are clearly upset.  What do you do?',
		canOccur: function (inn) {
			//todo: evaluate prereqs here (for this event the inn needs at least two dwarves at satisfaction level 3 or below)
			return true;
		},
		options: [
			{
				id: 3,
				description: 'Apologize, and offer them a free round of ale for their inconvenience.',
				canChoose: function (inn) {
					//todo: test inkeeper's ale supply, and ensure that charm level is at least <insert number>
					return true;
				},
				effect: function (inn) {
					//todo: reduce the supply, test innkeeper's charm (weighted success chance).
					//todo: if success, increase satisfaction and the dwarves stay
					//todo: if failure, dwarves leave.  Possibly some chance for satisfaction reduction/increase.
					return "The dwarves seem appeased and return to their comically oversized table.  Once again, alcohol proves that it can solve any problem.";
				},
				select: function () {
					return this.effect(Inn);
				}
			},
			{
				id: 4,
				description: 'Ignore their complaints',
				canChoose: true,
				effect: function (inn) {
					//todo: reduce the dwarves satisfaction rating (or possibly just make them leave altogether)
					return "Maybe you don't like short people, or maybe you're just too busy with other tasks to admit that you don't like short people.  Either way, the dwarves don't seem happy that you ignore their complaints, but given the limited options in town they return to their table to finish their drinks.";
				},
				select: function () {
					return this.effect(Inn);
				}
			}
		]
	}
];

	var Inn = {
		//properties
		name: 'The Stickit Inn',
		game: null,
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
		startNightShift: function (callbackWhenTickComplete, callbackWhenEventOccurs, callbackFunctionWhenComplete) {
			var nightShift = {
				callbackWhenEventOccurs: callbackWhenEventOccurs,
				callbackWhenTickComplete: callbackWhenTickComplete,
				callbackFunctionWhenComplete: callbackFunctionWhenComplete,
				inn: this,
				ticks: [],
				events: [],
				eventChance: this.game.gameSettings.baseEventChance,
				executeOneNightShiftTick: function () {
					this.ticks.push({});
					console.log('Starting tick ' + this.ticks.length);

					var eventsOccurred = false;

					var maxNewVisitors = this.inn.capacity - this.inn.currentVisitors.length;
					//todo: current visitors leave
					//todo: new visitors enter
					//todo: trigger events
					//todo: calculate transactions, adjust visitor satisfaction, adjust inventory
					var rand = Math.random();
					console.log('Random to compare event chance (' + this.eventChance + ') against: ' + rand);
					var shouldEventOccur = rand <= this.eventChance;
					if (shouldEventOccur) {
						console.log('An event might occur this tick...');
						var eventCandidates = [];
						for (var i = 0; i < Events.length; i++) {
							var e = Events[i];
							if ($.inArray(e, this.events) == -1 && e.canOccur(this)) {
								console.log('Prereqs met for event ' + e.id + ': "' + e.description + '"');
								eventCandidates.push(e);
							}
						}

						if (eventCandidates.length) {
							var eventIndex = getRandomInt(0, eventCandidates.length - 1);
							var eventToOccur = eventCandidates[eventIndex];
							console.log('event ' + eventToOccur.id + ' occurs: "' + eventToOccur.description + '"');
							this.events.push(eventToOccur);
							eventsOccurred = true;
							this.eventChance = this.inn.game.gameSettings.baseEventChance;
							if (this.callbackWhenEventOccurs) {
								this.callbackWhenEventOccurs.call(eventToOccur);
							}
						}
					}

					if (!eventsOccurred) {
						console.log('Nothing happens this tick...');
						this.eventChance += this.inn.game.gameSettings.eventEntropyPerTick;
					}

					console.log('Ending tick ' + this.ticks.length);

					if (this.callbackWhenTickComplete)
						this.callbackWhenTickComplete.call(this);
				},
				executeAnotherTickAsync: function () {
					if (this.ticks.length >= this.inn.game.gameSettings.ticksPerNightShift) {
						if (this.callbackFunctionWhenComplete) //if there is a callback function, call it (with 'this' pointing to the nightshift instance)
							this.callbackFunctionWhenComplete.call(this);
						return;
					}

					this.executeOneNightShiftTick();
					var self = this;

					setTimeout(function () { self.executeAnotherTickAsync(); }, this.inn.game.gameSettings.timeBetweenTicks);
				}
			};

			setTimeout(function () { nightShift.executeAnotherTickAsync(); }, 0); //0 as a timeout because we don't want to block the thread during the first tick.
		}
	};

var Game = {
	gameSettings: {
		ticksPerNightShift: 10,
		eventEntropyPerTick: .05,
		timeBetweenTicks: 1000,
		baseEventChance: 0.3
	},
	inn: Inn
};

Inn.game = Game;
