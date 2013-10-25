selected = null;
selectedPile = null;

var buildPiles = function(){
  domPiles = []
  domPiles[0] = $('.board > div').first();
  domPiles[1] = $('.board > div')[1];
  domPiles[2] = $('.board > div')[2];

  //create the piles in an array
  piles = [[1,2,3],[],[]];
  render();
  //create the piles as divs on the dom
};

var renderError = function(msg){
  $('.error').html(msg);
}

var render = function(){
  domPiles.forEach(function(pile){
    $(pile).html('');
  });
  piles.forEach(function(pile, pilesIndex){
    if (pile.length !== 0 ){
      pile.forEach(function(disc, discIndex){
        $(domPiles[pilesIndex]).append("<div class='disc-"+ (disc) +"'></div>");
      });
    }
  });
};

var doMove = function(current){
  var msg = "";
  if (piles[selected-1][0] < piles[current-1][0] || piles[current-1].length === 0  )
  {
    piles[current-1].unshift(piles[selected-1].shift());
    render();
  }
  else
  {
    msg = "<b>Error:</b> Invalid move."
  }
  renderError(msg);
  selected = null;
  selectedPile = null;
  winGame();
}

var winGame = function() {
  if(piles[1].length === 3 || piles[2].length === 3)
  {
    renderError('You win.')
  }
}

$(function(){
  buildPiles();

  $('.board').on('click', '.pile', function(e){
    var pile = e.currentTarget;
    if (selected === null){
      $(pile).toggleClass('selected', true);
      selected = $(pile).attr('data-id');
      selectedPile = pile;
    }
    else{
       $(selectedPile).toggleClass('selected', false);
       doMove($(pile).attr('data-id'));
    }
  });
});