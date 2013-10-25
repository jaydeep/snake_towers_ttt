// NB: This doesn't include any AI.

(function (root) {
  // if (!(typeof(require) === "undefined")) {
 //    _ = require('./underscore.js');
 //  }

  // var readline = require('readline');
 //  var READER = readline.createInterface({
 //    input: process.stdin,
 //    output: process.stdout
 //  });

  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function TT() {
    this.player = Game.marks[0];
    this.board = [["_","_","_"],["_","_","_"],["_","_","_"]];
  }

  Game.marks = ["x", "o"];

  Game.prototype.placeMark = function(idNum, player, callback){
    var row = parseInt(idNum / 3);
    var col = idNum % 3;
    this.board[row][col] = player ? "x" : "o";
    if (this.winner())
      callback(player);
    else
    {
      var flat = this.board[0].concat(this.board[1].concat(this.board[2]));
      var emptySpaces = flat.filter(function(tile){
        return tile === "_";
      });
      if(emptySpaces.length === 0) callback(null);
    }
  }


  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;

    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.horizontalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.verticalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.winner = function () {
    return (
      this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
    );
  };


  Game.prototype.run = function () {
    var game = this;

    game.turn(function(){
      if (game.winner()) {
        console.log("Someone won!");
        READER.close();
      } else {
        game.printBoard();
        game.run();
      }
    });
  }

})(this);