	// Function for generate ids (random string)
	var baseURL = 'https://kodilla.com/pl/bootcamp-api';
	var myHeaders = {
		'X-Client-Id': 'X-Client-Id',
  		'X-Auth-Token': 'X-Auth-Token'
	}

	$.ajaxSetup({
		headers: myHeaders
	})


	$.ajax({
		url: baseURL + '/board',
		method: 'GET',
		success: function(response) {
			setupColumns(response.columns);
		}
	})

	function setupColumns(columns){
		columns.forEach(function(column) {
			var col = new Column(column.id, column.name);
			$("#board").append(col.$element);
			setupCards(col, column.cards);
		})
	}

	function setupCards(column, cards) {
		cards.forEach(function(card) {
			var c = new Card(card.id, card.description, card.col_id);
			column.append()
		})
	}
	var col1 = new Column("ToDo");
	var col2 = new Column("In Progress");
	var col3 = new Column("Done");

	$("#board").append(col1.$element);
	$("#board").append(col2.$element);
	$("#board").append(col3.$element);
	initSortable();

	    // listener for adding new column.
	    // simple append new object to DOM
	$('#addColumn').click(function () {
	  	var name = prompt('Enter column name');
	   	if (name.length != 0) {
	   		var col = new Column(name);
	   		$("#board").append(col.$element);
	   	}
	})