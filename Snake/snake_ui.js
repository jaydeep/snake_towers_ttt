(function(root){

  var Snakes = root.Snakes = (root.Snakes || {});

  var View = Snakes.View = function(htmlElement){
    var $el = htmlElement;
  }

  View.prototype.start = function(){
    this.board = new Snakes.Board(10,10);
    this.timer = setInterval(this.step.bind(this),(1000/5));
  }

  View.prototype.step = function(){
    if (this.board.apples.length === 0){
      this.board.addApples((Math.floor(Math.random()*6)));
    }
    if (!this.board.moveSnake())
    {
      alert('you died');
      clearInterval(this.timer);
    }

    if (this.board.isGameOver())
    {
      alert('you died');
      clearInterval(this.timer);
    }
    else
      this.board.checkAppleCollision();

    var board = this.board.render();
    this.renderBoard(board);
  }

  View.prototype.renderBoard = function(board){
    $('.board').empty();
    for(var row = 0; row < board.length; ++row)
    {
      $('.board').append("<div class='row' id='row-" + row + "'></div>");
      for(var col = 0; col < board[row].length; ++col)
      {
        var tile = board[row][col];
        $('#row-' + row).append("<div class='" + tile + "' data-col-id='" + col + "'></div>");
      }
    }
  }

  View.prototype.handleKeyEvent = function(event){
    var dir = null;
    switch (String.fromCharCode(event.keyCode))
    {
      case 'W': dir = 'N'; break;
      case 'S': dir = 'S'; break;
      case 'A': dir = 'W'; break;
      case 'D': dir = 'E'; break;
    }
    this.board.addDir(dir);
    // this.board.snake.turn(dir);
    return false;
  }
})(this);

$(function(){
  var tmp = new Snakes.View(null)
  tmp.start();
  $(document).on('keydown', function (evt){
    tmp.handleKeyEvent(evt);
    return false;
  });
});