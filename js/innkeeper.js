function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

//loads the data into a richer format, with the game instance attached.
function loadData(game) {
	for (var i = 0; i < Dialogs.length; i++) {
		var dialog = Dialogs[i];
		dialog.game = game;
		for (var j = 0; j < dialog.choices.length; j++) {
			var choice = dialog.choices[j];
			choice.game = game;
			choice.select = function () {
				return this.effect(this.game);
			}
		}
	}

	for (var i = 0; i < Events.length; i++) {
		var event = Events[i];
		event.game = game;
		//attach the actual dialog object
		for (var d = 0; d < Dialogs.length; d++) {
			if (Dialogs[d].id == event.dialogid)
				event.dialog = Dialogs[d];
		}
	}
}


var Inn = {
	//properties
	name: 'The Stickit Inn',
	game: null, //is attached after constructing the Game object below
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
			eventChance: parseFloat(this.game.gameSettings.baseEventChance),
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
							console.log('Prereqs met for event ' + e.id + ': "' + e.dialog.text + '"');
							eventCandidates.push(e);
						}
					}

					if (eventCandidates.length) {
						var eventIndex = getRandomInt(0, eventCandidates.length - 1);
						var eventToOccur = eventCandidates[eventIndex];
						console.log('event ' + eventToOccur.id + ' occurs: "' + eventToOccur.dialog.text + '"');
						this.events.push(eventToOccur);
						eventsOccurred = true;
						this.eventChance = parseFloat(this.inn.game.gameSettings.baseEventChance);
						if (this.callbackWhenEventOccurs) {
							this.callbackWhenEventOccurs.call(eventToOccur);
						}
					}
				}

				if (!eventsOccurred) {
					console.log('Nothing happens this tick...');
					this.eventChance += parseFloat(this.inn.game.gameSettings.eventEntropyPerTick);
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

//loads the data from the data.js file (which should be included on the page prior to this file)
loadData(Game);