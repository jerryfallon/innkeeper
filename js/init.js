$(document).ready( function() {
	textLog = '';

	// Generate random inventory
	var type, chosenItems = {};
	for(var i in Items) {
		type = Items[i];
		chosenItems[i] = getRandomProperty(type);
		log('Your ' + i + ' tonight is ' + chosenItems[i]);
	}
	console.log(chosenItems);


	// Generate random visitors
	var visitors = [];
	var visitorCount = getRandom(1, 5);
	for(var i = 0; i <= visitorCount; i++) {
		visitors.push(getRandomProperty(Visitors));
	}
	console.log(visitors);


	// Determine each visitor's favor
	var visitor, item, j, favor, text, overallFavor = 0;
	for(i in visitors) {
		visitor = visitors[i];
		log('<br/>A ' + visitor + ' has arrived');
		favor = 0;
		for(j in chosenItems) {
			item = chosenItems[j];
			if(Visitors[visitor].preferences[j][item] === 'love') {
				log('<span style="color: blue;">He loves your ' + item + '</span>');
				favor++;
			} else if(Visitors[visitor].preferences[j][item] === 'hate') {
				log('<span style="color: red;">He HATES your ' + item + '</span>');
				favor--;
			} else {
				log('He is nonplussed by your ' + item);
			}
		}
		text = 'His overall favor towards your inn: ';
		if(favor > 0) {
			text += '<span style="color: blue;">' + favor + '</span>';
		} else if(favor < 0) {
			text += '<span style="color: red;">' + favor + '</span>';
		} else {
			text += favor;
		}
		log(text);
		overallFavor += favor;
	}

	log('<br/><b>Your overall favor for the night: ' + overallFavor + '</b>');

	$('body').html(textLog);
});