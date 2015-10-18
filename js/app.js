// this resets EVErytHING
$('#reset').click(function(){
	location.reload();
});

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
var $playerBank = 100;
var $currentBet = 0;

$('#bank').html('<h2>Player Bank: $ ' + $playerBank + '</h2>');

// this lets the player choose the bet amount
var $betAmount = $('<input/>').appendTo('#betting');
$betAmount.attr("placeholder", "BET AMOUNT?");
var $setBet = $('<button/>').appendTo('#betting');
$setBet.html('SET BET');

// this sets the bet and starts the game
$setBet.click(function(){
	$setBet.remove()
	$betAmount.remove()
	$currentBet = parseInt($betAmount.val());
	$playerBank = ($playerBank - $currentBet);
	$('<article>').appendTo('#betting').html('<h2> Current Bet: $ ' + $currentBet + '</h2>').attr('id', 'currentBet');
	$('#bank').html('<h2>Player Bank: $ ' + $playerBank + '</h2>')
	var $hit = $('<button/>').appendTo('#statusSection').attr('id', 'hit').html('HIT');
	var $stand = $('<button/>').appendTo('#statusSection').attr('id', 'stand').html('STAND');
	hitOrStand();
});

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
	}
};

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

	// pdid we get 21 right away?
	if (playersValue === 21){
		dealersPlay();
  }

	if (playersValue > 21){
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

  // Actually, I might not need this. Did this dealer win immediately? this is going to get more styling later
  // if (dealersValue === 21){
	// 	compareHands();
  // }

	// did the dealer get aces?
  if (dealersValue > 21){
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

// this defines the dealer's play after the player has hit stand, or hits BLACKJACK at the draw
var dealersPlay = function(){

	//let's get rid of the hit and stand buttons
	$( '#hit, #stand' ).remove();

	while(dealersValue <= 17){
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

		//  //does the dealer have 21?
		// if (dealersValue === 21){
		// 	 $('<h1>DEALER WINS STAND</h1>').appendTo('#statusSection');
		// 	 compareHands();
		// }

		 //lets deal with the dealer's aces
		if (dealersValue > 21){
			 dealerVsAces();
		}

		dealersValue = dealersValue - (dealerAcesUsed * 10);

	}
	compareHands();
}

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
     //lets deal with aces
    else if (playersValue > 21){
       playerVsAces();
    }

		// players current score
		playersValue = playersValue - (playerAcesUsed * 10);

		//do we have 21?
	 	if (playersValue === 21){
			dealersPlay();
	 	}

		else if (playersValue > 21 && playerAces === 0) {
			compareHands();

		}
  });

	$('#stand').click(function(){

		dealersPlay();

	});
};

// ok, lets see who won
var compareHands = function(){
	console.log('Players\'s final score: ' + playersValue);
	console.log('Dealers\'s final score: ' + dealersValue);

	// TIE
	if (dealersValue === playersValue){
		$('<h1>TIE</h1>').appendTo('#statusSection');
		$playerBank = $playerBank + $currentBet;
		$('#currentBet').html('<h2>Bet returned to bank</h2>');
		$currentBet = 0;
	}

	// DEALER BUSTS
	else if (dealersValue > 21 && dealerAces === 0) {
		$('<h1>DEALER BUSTS</h1>').appendTo('#statusSection');
		$playerBank = $playerBank + ($currentBet * 2);
		$('#currentBet').html('<h2>Player won: $ ' + $currentBet + '</h2>');
		$currentBet = 0;
	}

	// PLAYER BUSTS
	else if (playersValue > 21 && playerAces === 0) {
		$('<h1>PLAYER BUSTS</h1>').appendTo('#statusSection');
		$playerBank = $playerBank - $currentBet
		$('#currentBet').html('<h2>Player lost: $ ' + $currentBet + '</h2>');
		$currentBet = 0;
	}

	// BLACKJACK
	else if ((dealersValue != 21) && (playersValue === 21)){
		$('<h1>BLACKJACK!</h1>').appendTo('#statusSection');
		$playerBank = $playerBank + ($currentBet * 2.5);
		$('#currentBet').html('<h2>Player won: $ ' + ($currentBet + ($currentBet / 2)) + '</h2>');
		$currentBet = 0;
	}

	// DEALER WINS
	else if ((dealersValue <= 21) && (dealersValue > playersValue)){
		$('<h1>DEALER WINS FINAL</h1>').appendTo('#statusSection');
		$playerBank = $playerBank - $currentBet
		$('#currentBet').html('<h2>Player lost: $ ' + $currentBet + '</h2>');
		$currentBet = 0;
	}

	// PLAYER WINS
	else if ((playersValue <= 21) && (dealersValue < playersValue)){
		$('<h1>PLAYER WINS FINAL</h1>').appendTo('#statusSection');
		$playerBank = $playerBank + ($currentBet * 2);
		$('#currentBet').html('<h2>Player won: $ ' + $currentBet + '</h2>');
		$currentBet = 0;
	}

	$('#bank').html('<h2>Player Bank: $ ' + $playerBank + '</h2>')
};

// var payOut = function(){
// 	if
// };

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
