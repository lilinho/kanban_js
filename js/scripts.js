/*
#### js_src/Column.js ####
*/
function Column(id, name) {

    var self = this;
    this.id = id;
    this.name = name || "No name given";

    this.$element = createColumn();


    function createColumn() { // creating column in DOM

        /*
        First we create list element (see comment in index.html).
        In 'li' there will be title (<figure>), buttons for deleting column and adding card (in <figure> tag)
        And ordered list for cards    
        */
        var $column = $('<li>').addClass("column").attr('id', String(self.id));
        var $columnTitle = $('<figure>').addClass('column-title d-flex').html(
            '<span class="mr-auto p-2">' + self.name + '</span>');
        var $columnCardList = $('<ol>').addClass('card-list');
        var $deleteButton = $('<button>').addClass('btn-delete p-2').html(
            '<i class="fa fa-trash" aria-hidden="true"></i>'
        );
        var $addCard = $('<button>').addClass('btn-add p-2').html(
            '<i class="fa fa-plus" aria-hidden="true"></i>'
        );

        // event handlers
        $deleteButton.click(function () {
            self.removeColumn();
        });

        $addCard.click(function () {
            var description = prompt("Enter text");
            if (description.length != 0)
                $.ajax({
                    url: baseURL + '/card',
                    method: 'POST',
                    data: {
                        name: description,
                        bootcamp_kanban_column_id: self.id
                    },
                    success: function (response) {
                        self.addCard(new Card(response.id, description));
                    }

                });

        });

        $columnTitle.append($addCard)
            .append($deleteButton);
        $column.append($columnTitle)
            .append($columnCardList);
        return $column;
    }
}
// Prototypes for column class
Column.prototype = {
    removeColumn: function () { // removing column from server and DOM
        var self = this;
        $.ajax({
            url: baseURL + '/column/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.$element.remove();
            }

        });
    },
    addCard: function (Card) { // adding card to column
        this.$element.children('ol').append(Card.$element);
        // initSortable();

    }
};
/*
#### js_src/Card.js ####
*/
// class for Card
function Card(id, description) {

    var self = this;

    this.id = id;
    this.description = description || "No name given";
    this.$element = createCard();

    function createCard() { //creating single card. similar to createColumn();
        $card = $('<li>').addClass("card").attr("id", String(self.id));
        $cardDescription = $('<p>').addClass("card-descriptioin").text(self.description);
        $removeCard = $('<button>').addClass("btn-delete").html(
            '<i class="fa fa-trash" aria-hidden="true"></i>'
        );

        $removeCard.click(function () {
            self.removeCard();
        });
        $card.append($removeCard)
            .append($cardDescription);

        return $card;
    }
}

//prototypes for Card class
Card.prototype = {
    removeCard: function () {
        var self = this;
        $.ajax({
            url: baseURL + '/card/' + self.id,
            method: 'DELETE',
            success: function (response) {
                self.$element.remove();
            }
        });

    }
};
/*
#### js_src/Board.js ####
*/
$('#addColumn').click(function () {
    var columnName = prompt('Enter column name');
    if (columnName.length != 0) {

        $.ajax({
            url: baseURL + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function (response) {
                var col = new Column(response.id, columnName);
                $("#board").append(col.$element);
                initSortable();
            }
        });
    }
});
/*
#### js_src/App.js ####
*/
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