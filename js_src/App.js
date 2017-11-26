	// Function for generate ids (random string)
	var baseURL = 'https://kodilla.com/pl/bootcamp-api';
	var myHeaders = {
		'X-Client-Id': '2494',
  		'X-Auth-Token': '31cc78e3a866116142bc0dbbaaacd288'
	};

	$.ajaxSetup({
		headers: myHeaders
	});


	$.ajax({
		url: baseURL + '/board',
		method: 'GET',
		success: function(response) {
			setupColumns(response.columns);
		}
	});

	function setupColumns(columns){
		columns.forEach(function(column) {
			var col = new Column(column.id, column.name);
			$("#board").append(col.$element);
			setupCards(col, column.cards);
		});
	}

	function setupCards(column, cards) {
		cards.forEach(function(card) {
			var c = new Card(card.id, card.description, card.col_id);
			column.append(c.$element);
		});
	}

	 function initSortable() {
        
        $('.column-container').sortable({
            connectWith: '.column-container',
            placeholder: 'place-holder-x',
            scroll: false,
            opacity: 0.5,
            revert: true,
			axis: 'x',
            tolerance: 'pointer',
            handle: '.column-title'
        }).disableSelection();
        
        $('.card-list').sortable({
            connectWith: '.card-list',
            placeholder: 'place-holder-y',
            scroll: false,
            opacity: 0.5,
            revert: true,
            tolerante: 'pointer'
        }).disableSelection();
            
    }
	//var col1 = new Column("ToDo");
	//var col2 = new Column("In Progress");
	//var col3 = new Column("Done");

	//$("#board").append(col1.$element);
	//$("#board").append(col2.$element);
	//$("#board").append(col3.$element);
	
initSortable();
	    // listener for adding new column.
	    // simple append new object to DOM
	