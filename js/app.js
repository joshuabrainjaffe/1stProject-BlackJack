console.log('BLACKJACK!');
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

var myDeck = new deck();

// shuffle function!
function shuffle(a) {
	for(var b, c, d = a.length; d; b = parseInt(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c);
	return a;
};

myDeck = shuffle(myDeck);
console.log(myDeck);

var playerBank = 10;
var currentBet = 1;

// Place bet()

// clicking bet reduces player bank by the amount in the field and adds that amount to the pot

// initial cards are deal()
// two for player - both face up
var playersCards = [];

for (var e = 0; e < 2; e++) {
  var givePlayerCard = myDeck.shift();
  playersCards.unshift(givePlayerCard);
}
var playersValue = playersCards[0].value + playersCards[1].value;

console.log("player" + playersCards[0].name + playersCards[0].suit + ',' + playersCards[1].name + playersCards[1].suit);
console.log("player" + playersValue);

// two for dealer - one face down
// this is the dealer's current hand
var dealersCards = [];

for (var e = 0; e < 2; e++) {
  var giveDealerCard = myDeck.shift();
  dealersCards.unshift(giveDealerCard);
}
var dealersValue = dealersCards[0].value + dealersCards[1].value;

console.log("dealer" + dealersCards[0].name + dealersCards[0].suit + ',' + dealersCards[1].name + dealersCards[1].suit);
console.log("dealer" + dealersValue);

// this will visually represent the dealer's hand in the DOM
for (var e = 0; e < 2; e++) {
  var $card = $('<div/>').appendTo('#dealersHand');
  $($card).html("" + dealersCards[e].name + "" + dealersCards[e].suit);
  $($card).addClass('card');
}

// calculate() hands
// checks if anyone has Blackjack()
// move onto hitOrStand()

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
