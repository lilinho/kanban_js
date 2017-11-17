/*
TODO
* work on css. I think I forgot about something
* sortable (jQueryUI) - work on css place-holder
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
            var $column = $('<li>').addClass("column col-sm-2");
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
                self.addCard(new Card(prompt("Enter name for a card")));
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

    //initSortable. For drop and draf. Requires jQuery UI
    function initSortable(className) {
        $(className).sortable({
            connectWith: className,
            placeholder: 'place-holder'
        }).disableSelection();
    }
    //TESTING
    var col1 = new Column("cos 1");
    var col2 = new Column("cos 2");
    var col3 = new Column("cos 3");

    $("#board").append(col1.$element);
    $("#board").append(col2.$element);
    $("#board").append(col3.$element);
    initSortable('.column-container');
    initSortable('.card-list');
    
    // listener for adding new column.
    // simple append new object to DOM
    $('#addColumn').click(function () {
        var name = prompt('Enter column name');

        var col = new Column(name);
        $("#board").append(col.$element);
        initSortable('.column-container');
        initSortable('.card-list');
    })
})