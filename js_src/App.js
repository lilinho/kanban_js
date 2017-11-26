var baseURL = 'https://kodilla.com/pl/bootcamp-api';

var myHeaders = {
    'X-Client-Id': '2494',
    'X-Auth-Token': '31cc78e3a866116142bc0dbbaaacd288'
};

$.ajaxSetup({
    headers: myHeaders
});


/*
I had to remove sortable for columns because API doesn't support this option.

Added receive function. After dragging is finished function in receive is called. 
It changes old column id to new one.
*/
function initSortable() {

    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'place-holder-y',
        scroll: false,
        opacity: 0.5,
        revert: true,
        tolerante: 'pointer',
        receive: function (event, ui) {
            $.ajax({
                url: baseURL + '/card/' + ui.item.attr("id"),
                method: 'PUT',
                data: {
                    name: $(this).text(),
                    bootcamp_kanban_column_id: ui.item.parents()[1].id
                }
            });
        }
    }).disableSelection();

}

// ajax request for current state of kanban board

$.ajax({
    url: baseURL + '/board',
    method: 'GET',
    success: function (response) {
        setupColumns(response.columns);
    }
});


function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        $("#board").append(col.$element);
        initSortable();
        setupCards(col, column.cards);
    });
}

function setupCards(column, cards) {
    cards.forEach(function (card) {
        var c = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        column.$element.children('ol').append(c.$element);
        initSortable();
    });
}



initSortable();