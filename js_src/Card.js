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