function Column(id, name) {

        var self = this;
        this.id = id;
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