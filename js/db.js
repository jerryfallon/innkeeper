function Db() {
	this.apiUrl = 'php/api.php';

	this.xhr = undefined;

	this.schema = {
		drink: {
			name: { type: 'text' },
			basecost: { type: 'int' },
			description: { type: 'longtext' },
			abv: { type: 'int' },
			quenching: { type: 'int' }
		},
		food: {
			name: { type: 'text' },
			basecost: { type: 'int' },
			description: { type: 'longtext' },
			vegetarian: { type: 'bool' },
			filling: { type: 'int' }
		}
	};

	this.initHandlers();
}

Db.prototype.initHandlers = function() {
	var that = this;

	$('.pane-picker').click(function() {
		var type = $(this).data('id');
		$('.pane-picker.selected').removeClass('selected');
		$(this).addClass('selected');
		that.displayPane(type);
	});

	$('.form-picker').click(function() {
		var type = $(this).data('id');
		$('.form-picker.selected').removeClass('selected');
		$(this).addClass('selected');
		that.displayForm(type);
	});

	$('.list-picker').click(function() {
		var type = $(this).data('id');
		$('.list-picker.selected').removeClass('selected');
		$(this).addClass('selected');
		that.loadData(type);
	});

	$(document).on('click', '#form-submit', function() {
		var type = $(this).data('id');
		that.submitForm(type);
	});
}

Db.prototype.displayPane = function(type) {
	$('.pane').hide();
	$('#form-message').text('');
	$('#form-contents, #list-contents').html('');
	$('.list-picker.selected, .form-picker.selected').removeClass('selected');
	$('#'+type).show();
};

Db.prototype.displayForm = function(type) {
	var html = this.generateForm(type);
	$('#form-contents').html(html);
};

Db.prototype.generateForm = function(type) {
	var cols = this.schema[type];
	var col;

	var source = $('#template-input-form').html();
	var template = Handlebars.compile(source);
	var context = {
		type: type,
		fields: []
	};

	for(var i in cols) {
		col = cols[i];
		context.fields.push( { name: i, type: col.type } );
	}
	return template(context);
};

Db.prototype.submitForm = function(type) {
	var cols = this.schema[type];
	var col, data = [];
	for(var i in cols) {
		col = cols[i];
		if(col.type == 'bool') {
			data.push( {column: i, value: $('[data-id="'+i+'"]').is(':checked') } );
		} else {
			data.push( {column: i, value: $('[data-id="'+i+'"]').val() } );
		}
	}
	this.addData(type, data, function(id) {
		$('#form-message').text('Sucessfully Added Record #' + id).show();
		// Reset form by reclicking the type button
		$('.form-picker[data-id="'+type+'"]').click();
	});
};

Db.prototype.loadData = function(type) {
	var source = $('#template-results-table').html();
	var template = Handlebars.compile(source);
	var context = {
		columns: [],
		rows: []
	};
	for(var i in this.schema[type]) {
		context.columns.push({name:i});
	}

	this.select(type, function(results) {
		var row, data, col, val;
		for(var i in results) {
			row = results[i];
			data = {
				columns: []
			};
			for(col in row) {
				val = row[col];
				data.columns.push({value:val});
			}
			context.rows.push(data);
		}
		var html = template(context);
		$('#list-contents').html(html);
	});
};



/* API Functions */
Db.prototype.addData = function(table, vals, cb) {
	var data = {
		command: 'addData',
		table: table,
		data: JSON.stringify(vals)
	};
	// console.log(data);
	$.post(this.apiUrl, data, function(results) {
		if(typeof cb === 'function') {
			cb(results);
		}
	}, 'json');
};

Db.prototype.select = function(table, cb) {
	var data = {
		command: 'getData',
		table: table
	};
	// console.log(data);
	if(this.xhr) { this.xhr.abort(); }
	this.xhr = $.post(this.apiUrl, data, function(results) {
		if(typeof cb === 'function') {
			cb(results);
		}
	}, 'json');
};

Db.prototype.updateData = function(table, vals, where, cb) {
	var data = {
		command: 'updateData',
		table: table,
		where: JSON.stringify(where),
		data: JSON.stringify(vals)
	};
	$.post(this.apiUrl, data, function(results) {
		if(typeof cb === 'function') {
			cb(results);
		}
	});
};




/* Handlebars helper */
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});