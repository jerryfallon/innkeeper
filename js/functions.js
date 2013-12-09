// Returns a random integer between x and y inclusive
function getRandom(x, y) {
	return Math.round(Math.random()*(y-x) + x);
}

// Returns a random property name from an object
function getRandomProperty(obj) {
	var result;
	var count = 0;
	for(var prop in obj) {
		if(Math.random() < 1/++count) {
			result = prop;
		}
	}
	return result;
}

// Returns a random property value from an object
function getRandomPropertyValue(obj) {
	var result;
	var count = 0;
	for(var prop in obj) {
		if(Math.random() < 1/++count) {
			result = obj[prop];
		}
	}
	return result;
}

function log(text) {
	textLog += (textLog ? '<br/>' : '') + text;
}