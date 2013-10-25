(function(root){

  var Snakes = root.Snakes = (root.Snakes || {});

  var Snake = Snakes.Snake = function(startX, startY){
    this.posX = startX;
    this.posY = startY;
    this.dir = null;
    this.segments = [[startX, startY]];
  }

  Snake.prototype.move = function(dimX,dimY){
    switch (this.dir)
    {
      case 'N': this.posX -= 1; break;
      case 'S': this.posX += 1; break;
      case 'E': this.posY += 1; break;
      case 'W': this.posY -= 1; break;
      default: ;
    }
    this.segments.pop();
    this.segments.unshift([this.posX, this.posY]);
    if(this.posX < 0 || this.posX >= dimX || this.posY < 0 || this.posY >= dimY) return false;

    return true
  }

  Snake.prototype.turn = function(newDir){
    this.dir = newDir;
  }

  // var Coord = Snakes.Coord = function(){
  //
  // }
  //
  // Coord.prototype.plus = function(){
  //
  // }

  var Board = Snakes.Board = function(dimX, dimY){
    this.DIM_X = dimX;
    this.DIM_Y = dimY;
    this.apples = [];
    this.board = this.buildBoard(dimX,dimY);
    this.snake = new Snake(dimX/2-1, dimY/2-1);
    // this.addApples(20);
    this.dirs = [];
  }

  Board.prototype.addDir = function(dir){
    if (dir !== null)
      this.dirs.push(dir);
  }

  Board.prototype.checkAppleCollision = function(){
    var that = this;
    this.apples.forEach(function(apple, index){
      if (apple[0] === that.snake.posX && apple[1] === that.snake.posY){
        //add to segments
        that.snake.segments.push(apple);
        //remove the apple
        that.removeApple(index);
      }
    })
  }

  Board.prototype.removeApple = function(indexOfApple){
    this.apples.splice(indexOfApple, 1);
  }

  Board.prototype.isGameOver = function(){
    var gameOver = false;
    var that = this;
    var checkSeg = this.snake.segments.slice(1)

    checkSeg.forEach(function(segment){
      // console.log("CurrentPos:" + that.snake.posX + ", " + that.snake.posY + "|  SegmentPos:" + segment[0] + ", " + segment[1]);
      // console.log("SegmentPos:" + segment[0] + ", " + segment[1]);
      if(segment[0] === that.snake.posX && segment[1] === that.snake.posY)
      {
          console.log("CurrentPos:" + that.snake.posX + ", " + that.snake.posY + "|  SegmentPos:" + segment[0] + ", " + segment[1]);
          gameOver = true;
      }

      // var collisions = segment.filter(function(otherSegment){
      //   return (segment[0] === otherSegment[0] && segment[1] === otherSegment[1]);
      // })
      //
      // if (collisions.length !== 0)
      // {
      //   gameOver = true;
      //   console.log("gameOver");
      // }

    })

    return gameOver;
  }

  Board.prototype.addApples = function(numApples){
    if (numApples === 0)
      return this.apples;

    var randomX = Math.floor(Math.random() * this.DIM_X);
    var randomY = Math.floor(Math.random() * this.DIM_Y);

    if (this.board[randomX][randomY] === '.')
    {
      this.apples.push([randomX,randomY]);
      return this.addApples(numApples-1);
    }
    else
      return this.addApples(numApples);
  }

  Board.prototype.moveSnake = function(){
    if (this.dirs.length){
      var nextDir = this.dirs.shift();
      this.snake.turn(nextDir);
    }
    if(!this.snake.move(this.DIM_X,this.DIM_Y))
    {
      return false;
    }
    return true;
    // this.checkAppleCollision();
  }

  Board.prototype.buildBoard = function(dimX, dimY){
    var board = [];

    for(var i = 0; i < dimX; i++)
    {
      board.push([]);
      for(var j = 0; j < dimY; j++)
      {
        board[i].push(".");
      }
    }
    return board;
  }

  Board.prototype.buildSnakeAndApple = function(){
    this.board = this.buildBoard(this.DIM_X, this.DIM_Y);
    var that = this;
    this.snake.segments.forEach(function(vector){
      var x = vector[0];
      var y = vector[1];
      that.board[x][y] = "S";
    });

    this.apples.forEach(function(vector){
      var x = vector[0];
      var y = vector[1];
      that.board[x][y] = "A";
    })
  }

  Board.prototype.render = function(){
    var results = [];
    this.buildSnakeAndApple();
    this.board.forEach(function(row){
      results.push(row);
    });
    return results;
  }

  var board = new Snakes.Board(10,10);
})(this);

