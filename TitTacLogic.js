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
    currentTurn: "X",
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
    //if realGame is false, game will not end, so AI can expeiment
    checkWin: function(realGame) {
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
                        if (counter == 3) {

                            console.log(buffer + " win");
                            if (realGame) { message(buffer + " win"); }

                            return buffer + " win";
                        }
                    }
                }
            }
        }
        if (!this.freeCells) {
            console.log("draw");
            if (realGame){message("draw");}
            return "draw";
        }
    },

    iteration: function(symbol, cellId) {
        this.board[cellId] = symbol;

        $("#" + cellId).html(symbol);
        this.freeCells--;
        game.checkWin(true);

        
        if (this.currentTurn == "X") {
            this.currentTurn = "O";
        } else {
            this.currentTurn = "X";
        }
    }
};


var enemy = {
    computerBoard: ['E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'
    ],
    checkWin : function(board){
        var posibilities = [];
        for (var a = 0; a < board.length; a++){
            if (board[a] == "E"){
                
            }
        }
    },
    };
    // function draw(symbol, cellId) {
    //     $("#" + cellId).html(symbol);
    // }

function initializeGame() {
    $(".endOfGame").fadeOut(200);
    $(".cell").html("");
    game.board = ['E', 'E', 'E',
        'E', 'E', 'E',
        'E', 'E', 'E'
    ];
    game.freeCells = 9;
    game.currentTurn = 'X';
    $(".menu").fadeIn(200);
}

function message(mes) {
    $("#message").html(mes);
    $(".endOfGame").fadeIn(200);
}




function load() {
    $("#restart").on("click", initializeGame);
    $(".cell").on("click", function() {
        if (!$(this).html()) {
            game.iteration(game.currentTurn, $(this).attr('id'));
        }
        //add checking for X or O
    });

    $("#one, #two").click(function() {
        var mode = '';
        if ($(this).attr('id') == "one") {
            mode = 'one';
        } else {
            mode = 'two';
        }
        $(".menu").fadeOut(200);
        $(".menuXorO").fadeIn(200);
        $("#X, #O").click(function() {
            game.firstPlayerSymbol = $(this).attr('id');
            if (mode == 'one') {
                if (game.firstPlayerSymbol == 'O') {
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
