

$('#addColumn').click(function () {
	  	var columnName = prompt('Enter column name');
	   	if (columnName.length != 0) {

	   		$.ajax({
	   			url: baseURL + '/column',
	   			method: 'POST',
	   			data: {
	   				name: columnName 
	   			},
	   			success: function(response) {
	   				var col = new Column(response.id, columnName);
	   				$("#board").append(col.$element);
	   			}
	   		});
	   	}
	});