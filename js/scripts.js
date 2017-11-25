/*
TODO
* AJAX/API
*/

$(function () {

    // Definition of Column class
    


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
})