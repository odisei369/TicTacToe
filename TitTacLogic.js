$(document).ready(function() {
    load();
});
var game = {
    board: ['E', 'E', 'E',
            'E', 'E', 'E',
            'E', 'E', 'E'
    ],
    firstPlayerSymbol: '',
    aiSymbol: '',
    currentTurn : "X",
    winCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    freeCells: 9,
    iteration: function(symbol, cellId) {
        this.board[cellId] = symbol;

        $("#" + cellId).html(symbol);
        this.freeCells--;
        for (var a = 0; a < this.winCombinations.length; a++) {
            var buffer = "";
            var counter = 0;
            for (var b = 0; b < this.winCombinations[a].length; b++) {
                if (this.board[this.winCombinations[a][b]] != "E" && !buffer) {
                    buffer = this.board[this.winCombinations[a][b]];
                    counter++;
                } else {
                    if (buffer != this.board[this.winCombinations[a][b]]) {
                        break;
                    } else {
                        counter++;
                        if (counter == 3) { console.log(buffer + " win");
                            return buffer + " win"; }
                    }
                }
            }
        }
        if (!this.freeCells) { console.log("draw");
            return "draw"; }
        if (this.currentTurn == "X"){
          this.currentTurn = "O";
        } else {
          this.currentTurn = "X";
        }
    }

};

// function draw(symbol, cellId) {
//     $("#" + cellId).html(symbol);
// }

// function initialize2players() {
//     game.board = ['E', 'E', 'E',
//                   'E', 'E', 'E',
//                   'E', 'E', 'E'
//     ];
//     game.freeCells = 9;
//     game.firstPlayerSymbol = "X";
//     game.currentTurn = 'X';
// }




function load() {
    $(".cell").on("click", function() {
        if (!$(this).html()){
          game.iteration(game.currentTurn, $(this).attr('id'));
        }//TODO add checking for if cell is empty
        //add checking for X or O
        
        console.log("1");

    });

    $("#one, #two").click(function() {
      var mode = '';
            if ($(this).attr('id') == "one"){
              mode = 'one';
            }else {
              mode = 'two';
            }
            $(".menu").fadeOut(200);
            $(".menuXorO").fadeIn(200);
            $("#X, #O").click(function(){
              game.firstPlayerSymbol = $(this).attr('id');
              if (mode == 'two'){
                if (game.firstPlayerSymbol == 'O'){
                  game.aiSymbol = 'X';
                  //TODO do the AI thing
                } else {
                  game.aiSymbol = 'O';
                }
              }
            $(".menuXorO").fadeOut(200);  
            });
        
    });
}
