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