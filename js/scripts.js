/*
TODO
* styles for cards (columns and buttons are done I think)
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
        
        $deleteButton.click(function() {
            self.removeColumn();
        });
        
        $addCard.click(function() {
            self.addCard();
        })
        
        $columnTitle.append($addCard)
            .append($deleteButton)
        $column.append($columnTitle)
               .append($columnCardList);
        
        return $column;
    }
     
}

    var col1 = new Column("cos 1");
    var col2 = new Column("cos 2");
    var col3 = new Column("cos 3");
    
    $("#board").append(col1.$element);
    $("#board").append(col2.$element);
    $("#board").append(col3.$element);
    
$('#addColumn').click(function() {
    var name = prompt('Column name');
        
    var col = new Column(name);
    $("#board").append(col.$element);
})
})