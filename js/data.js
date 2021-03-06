﻿//this data could be loaded from a db.  I separated it for that reason.
//One big issue is that this data contains functions, which we can't return via JSON without custom serialization.
//Need ideas on how to workaround that limitation. -tyler

//events spawn dialog trees.  Because they can get complicated and have multiple branches, I separated the actual dialogs from events. -tyler
var Dialogs = [
	{
		id: 1,
		text: 'First level dialog.',
		choices: [
			{
				id: 1,
				text: 'choice 1 for first level dialog.',
				canChoose: true, //can be a function
				effect: function (game) {
					return { dialog: 2}; //can return a string (message displayed to player) or a dialog id
				}
			},
			{
				id: 2,
				text: 'choice 2 for first level dialog.',
				canChoose: true, //can be a function
				effect: function (game) {
					game.inn.inventory.drink.ale--;
					return { message: 'Simple message; no dialog returned by this choice.  Ale should have reduced by one.' };
				}
			}
		]
	},
	{
		id: 2,
		text: 'Second level dialog.',
		choices: [
			{
				id: 3,
				text: 'choice 1 for second level dialog.',
				canChoose: true, //can be a function
				effect: function (game) {
					game.inn.inventory.drink.mead = 0;
					return { message: 'Yay it works!  Mead should be reduced to 0' };
				}
			}
		]
	}
];

var Events = [
	{
		id: 1,
		time: 5000,
		canOccur: function (inn) {
			return true;
		},
		dialogid: 1 //events always reference a dialog.
	}
];