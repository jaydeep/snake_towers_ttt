window.currentPlayer = true;
window.boardArray = [];

var idk = function(player){
  if(player === null)
    console.log('Draw!');
  else
  {
    if(player)
      player = "red";
    else if(player === false)
      player = "green";
    console.log(player + " WON!");
  }
  $('.board').off('click');
}

$(function (){
  var tGame = new TTT.Game();

  $('.board').on('click','div', function(e) {
    var element = e.target;
    if(element.className === 'red' || element.className === 'green') return;
    if(window.currentPlayer)
      $(element).toggleClass('red', true);
    else
      $(element).toggleClass('green', true);

      var idNum = $(element).attr('id');
      tGame.placeMark(idNum, window.currentPlayer, idk);
     window.currentPlayer = !window.currentPlayer;
  })
});