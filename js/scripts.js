/*
TODO
* AJAX/API
*/

$(function () {

    // Function for generate ids (random string)
    function randomString() {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZXYZ";
        var str = '';

        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }

        return str;
    }

    // Definition of Column class
    function Column(name) {

        var self = this;
        this.id = randomString();
        this.name = name;

        this.$element = createColumn();

        function createColumn() { // creating column in DOM

            /*
            First we create list element (see comment in index.html).
            In 'li' there will be title (<figure>), buttons for deleting column and adding card (in <figure> tag)
            And ordered list for cards    
            */
            var $column = $('<li>').addClass("column");
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
                    self.addCard(new Card(description));
            })

            $columnTitle.append($addCard)
                .append($deleteButton);
            $column.append($columnTitle)
                .append($columnCardList);

            return $column;
        }

    }
    // Prototypes for column class
    Column.prototype = {
        removeColumn: function () { // removing column from DOM
            this.$element.remove();
        },
        addCard: function (Card) { // adding card to column
            this.$element.children('ol').append(Card.$element);
        }
    }


    // class for Card
    function Card(description) {

        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() { //creating single card. similar to createColumn();
            $card = $('<li>').addClass("card");
            $cardDescription = $('<p>').addClass("card-descriptioin").text(self.description);
            $removeCard = $('<button>').addClass("btn-delete").html(
                '<i class="fa fa-trash" aria-hidden="true"></i>'
            );

            $removeCard.click(function () {
                self.removeCard();
            })
            $card.append($removeCard)
                .append($cardDescription);

            return $card;
        }
    }

    //prototypes for Card class
    Card.prototype = {
        removeCard: function () {
            this.$element.remove();
        }
    }
    //initSortable. For drop and drag. Requires jQuery UI
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
    //TESTING
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
})