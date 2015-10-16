// start game()
// clears board
// resets all values
// place bet() button and input field appears

// first lets set up our cards
function card(value, name, suit) {
	this.value = value;
	this.name = name;
	this.suit = suit;
}

function deck() {
  this.values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
	var cards = [];
    for (var s = 0; s < this.suits.length; s++ ) {
      for (var n = 0; n < this.names.length; n++ ) {
        cards.push( new card( this.values[n], this.names[n], this.suits[s] ) );
      }
    }
  return cards;
}

var cardDeck = new deck();

// shuffle function!
function shuffle(a) {
	for(var b, c, d = a.length; d; b = parseInt(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c);
	return a;
};

cardDeck = shuffle(cardDeck);

// I swear this will become a betting system
var playerBank = 100;
var currentBet = 10;

$('#start').click(function(){

});

// Place bet()

// clicking bet reduces player bank by the amount in the field and adds that amount to the pot

// initial cards are deal()
// two for player - both face up

// this sets up the player's hand
var playersCards = [];
var playerAces = 0;
var playerAcesUsed = 0;
var playersValue = 0;

// this deals with the player's aces
var playerVsAces =  function(){
	if (playerAces > 0){
		--playerAces;
		playerAcesUsed++;
		console.log('Player Aces left= ' + playerAces);
	}
}

// let's give the player some cards
var playerDeal = function(){
  for (var e = 0; e < 2; e++) {
    var givePlayerCard = cardDeck.shift();
    playersCards.unshift(givePlayerCard);

    //Did we get any aces? This will matter later
    if (givePlayerCard.name === 'A'){
      playerAces++;
    }
  }

  //calculating player's hand value at first deal this is going to get more styling later
  playersValue = playersCards[0].value + playersCards[1].value;
  if (playersValue === 21){
    $('<h1>PLAYER WINS</h1>').appendTo('#statusSection');
  }
  else if (playersValue > 21){
    playerVsAces();
  }

	//let's put the player's cards into the dom!
  for (var e = 0; e < 2; e++) {
    var $card = $('<div/>').appendTo('#player1');
    $($card).addClass('card');
    if(playersCards[e].suit == 'Diamonds'){
  			var ascii_char = '♦';
  		} else {
  			var ascii_char = '&' + playersCards[e].suit.toLowerCase() + ';';
  		}
    $($card).html(playersCards[e].name + " " +  ascii_char);
  }
	console.log('Player value at deal: ' + playersValue);
};
playerDeal();

// this sets up the dealer's hand
var dealersCards = [];
var dealerAces = 0;
var dealerAcesUsed = 0
var dealersValue = 0;

var dealerVsAces =  function(){
	if (dealerAces > 0){
		--dealerAces;
		dealerAcesUsed++;
		console.log('Dealer Aces left= ' + dealerAces);
	}
}

var dealerDeal = function(){
  for (var e = 0; e < 2; e++) {
    var giveDealerCard = cardDeck.shift();
    dealersCards.unshift(giveDealerCard);

    //Did the dealer get any aces? This will matter later
    if (giveDealerCard.name === 'A'){
      dealerAces++;
    }
  }

  //calculating dealer's hand value at deal
  dealersValue = dealersCards[0].value + dealersCards[1].value;

  // Did this dealer win immediately? this is going to get more styling later
  if (dealersValue === 21){
    $('<h1>DEALER WINS</h1>').appendTo('#statusSection');
  }

	// did the dealer get aces?
  else if (dealersValue > 21){
    if (dealerAces = 2){
      dealerVsAces();
    }
  }

  // this will visually represent the dealer's hand in the DOM
  for (var e = 0; e < 2; e++) {
    var $card = $('<div/>').appendTo('#dealersHand');
    $($card).addClass('card');
    if(dealersCards[e].suit == 'Diamonds'){
  			var ascii_char = '♦';
  		} else {
  			var ascii_char = '&' + dealersCards[e].suit.toLowerCase() + ';';
  		}
    $($card).html(dealersCards[e].name + " " +  ascii_char);
  }
};
dealerDeal();

var hitOrStand = function(){

	// this governs the HIT button
  $('#hit').click(function(){
    givePlayerCard = cardDeck.shift();
    playersCards.unshift(givePlayerCard);
    $card = $('<div/>').appendTo('#player1');
    $($card).addClass('card');
    if(playersCards[0].suit == 'Diamonds'){
  			var ascii_char = '♦';
  		} else {
  			var ascii_char = '&' + playersCards[0].suit.toLowerCase() + ';';
  		}
    $($card).html(playersCards[0].name + " " +  ascii_char);

    // let's see what the player's hand value is
    playersValue = playersCards.reduce(
	    function(prev,current){
      return  +(current.value) + prev;
      }, 0
    );
    if (givePlayerCard.name === 'A'){
     playerAces++;
		}
		 //do we have 21?
    if (playersValue === 21){
       $('<h1>PLAYER WINS</h1>').appendTo('#statusSection');
    }
     //lets deal with aces
    else if (playersValue > 21){
       playerVsAces();
    }

		playersValue = playersValue - (playerAcesUsed * 10);
		console.log(playersValue);

		if (playersValue > 21 && playerAces === 0) {
			$('<h1>PLAYER BUSTS</h1>').appendTo('#statusSection');
		}
  });
};

$('#stand').click(function(){
	//trying to turn off the hit button
	// $('#hit').off( event );

	// now the dealer plays
	giveDealerCard = cardDeck.shift();
	dealersCards.unshift(giveDealerCard);
	$card = $('<div/>').appendTo('#dealersHand');
	$($card).addClass('card');
	if(dealersCards[0].suit == 'Diamonds'){
			var ascii_char = '♦';
		} else {
			var ascii_char = '&' + dealersCards[0].suit.toLowerCase() + ';';
		}
	$($card).html(dealersCards[0].name + " " +  ascii_char);

	// let's see what the dealer's hand value is
	dealersValue = dealersCards.reduce(
		function(prev,current){
		return  +(current.value) + prev;
		}, 0
	);
	if (giveDealerCard.name === 'A'){
	 dealerAces++;
	}
	 //does the dealer have 21?
	if (dealersValue === 21){
		 $('<h1>Dealer WINS</h1>').appendTo('#statusSection');
	}
	 //lets deal with the dealer's aces
	else if (dealersValue > 21){
		 dealerVsAces();
	}

	dealersValue = dealersValue - (dealerAcesUsed * 10);
	console.log(dealersValue);

	if (dealersValue > 21 && dealerAces === 0) {
		$('<h1>DEALER BUSTS</h1>').appendTo('#statusSection');
	}

});

hitOrStand();
// hitOrStand()
// Hit() and Stand() Buttons appear
// Hit() takes another card from deck and adds to hand
// calculate() hand array
// if 21 move onto dealer() turns
// back to hitOrStand()
// Stand() moves onto dealer() turns

// dealer()
// AI that runs hitOrStand function
// if below 17, dealer hits. on or after 17 she stands
// move onto compare()

// compare()
// if player’s hand is less than 21 and player’s hand is greater than dealer’s - player wins.
// move onto bet distribution()
// else if dealer’s hand is less than 21 and dealer’s and is greater than player's - dealer wins
// move onto bet distribution()
// else if player’s hand === dealer’s hand - push
// move onto bet distribution()

// bet distribution()
// if player wins - pot goes to player’s bank
// if dealer wins - pot goes to dealer’s bank
// if push (tie) - dealer and player’s bets go back to their respective banks
// play again? show start() button
