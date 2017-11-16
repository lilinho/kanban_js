/*
TODO
* styles for columns and cards
* styles for buttons (add, remove)
* addColumn function (i don't know if it's necessary)
* sortable (jQueryUI)
* addCard functionality
*/

$(function() {
    
// Function for generate ids (random string)
function randomString() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZXYZ";
    var str = '';
    
    for(var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random()*chars.length)];
    }
    
    return str;
}

// Definition of Column class
function Column(name) {
    
    var self = this;
    this.id = randomString();
    this.name = name;
    
    this.$element = createColumn();
    
    function createColumn() {
        var $column = $('<li>').addClass("column");
        var $columnTitle = $('<figure>').text('column-title').text(self.name);
        var $columnCardList = $('<ol>').addClass('card-list');
        var $deleteButton = $('<button>').addClass('btn-delete').html(
        '<i class="fa fa-trash" aria-hidden="true"></i>'
        );
        var $addCard = $('<button>').addClass('btn-add').html(
        '<i class="fa fa-plus" aria-hidden="true"></i>'
        );
        
        $deleteButton.click(function() {
            self.removeColumn();
        });
        
        $addCard.click(function() {
            self.addCard();
        })
        
        $column.append($columnTitle)
               .append($columnCardList)
               .append($addCard)
               .append($deleteButton);
        
        return $column;
    }
     
}

    var col1 = new Column("cos");
    $("#board").append(col1.$element);
    
$('#addColumn').click(function() {
    var name = prompt('Column name');
        
    var col = new Column(name);
    $("#board").append(col.$element);
})
})