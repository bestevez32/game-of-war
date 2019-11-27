/* 
The approach for this coding exercise was to
  1. Declare the shape of a card, suits and values
  2. Functionality for constructing the individual card objects - buildCards()
  3. Functionality for shuffling the cards - shuffleCards()
  4. Functionality for dealing the cards - dealCards()
  5. At this point in the project these methods are all that are needed to construct a deck of cards and deal to two players.
      With the current code structure if additional players would be needed the code would have to be adjusted 
        let playerKey = cards % 4 in dealCards() and also in the player multidimensional declaration let players = [[], [], [], []];
  6. The HTML structure would also need to be adjusted to account for additional player containers.
  7. When the game is instantiated for the first time the deck is built, shuffled and dealt. 
      goToWar() first declares the newGame to false, otherwise the methods described in the above steps would fire each time the Go To War button was pressed
  8. The rest of the code is a series of comparisson operations to determine the value and point allocation for a given player
      A condition of valid game play is that a player has more than 4 cards in their deck array, when this condition is no longet met the game is declared over
  9. Logic has also been built in to account for a tie during game play if during the comparisson operation checkWinner() there is no clear winner the 
      resolveTie() method is called. The array for each player is increased by 4 additional cards and they last value is used to determine checkWinner().
*/
const suits = ["spades", "diams", "hearts", "clubs"];
const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

//Declare variables
let cards = [];
let players = [[], []];
let newGame = true;
let gameOver = false;

//Declare Query Selectors
const warButton = document.querySelector("#btnWar");
const playerOne = document.querySelector("#player1 .hand");
const playerTwo = document.querySelector("#player2 .hand");
const playerOneScore = document.querySelector("#player1Score");
const playerTwoScore = document.querySelector("#player2Score");

//event listener
warButton.addEventListener("click", goToWar);

//functions
function goToWar() {
  if (newGame) {
    newGame = false;
    buildCards();
    shuffleCards(cards);
    dealCards(cards);
  }
  declareWar();
}

function declareWar() {
  if (!gameOver) {
    //Shift to move through the cards, removes first element from array
    let playerCardOne = players[0].shift();
    let playerCardTwo = players[1].shift();
    let pot = [playerCardOne, playerCardTwo];
    //Update HTML
    playerOne.innerHTML = showCard(playerCardOne, 0);
    playerTwo.innerHTML = showCard(playerCardTwo, 0);
    //Check Winners
    checkWinner(playerCardOne, playerCardTwo, pot);
    //Update Scores
    playerOneScore.innerHTML = players[0].length;
    playerTwoScore.innerHTML = players[1].length;
  } else {
    outputMessage("Game Over");
  }
}

function outputMessage(message) {
  document.getElementById("message").innerHTML = message;
}

//This function takes the arguments of players cards and the pot array
//It looks to see if either player has less than 4 cards, the condition for victory
function checkWinner(playerCardOne, playerCardTwo, pot) {
  playerValues = [0, 1];
  playerValues.map(value => {
    if (players[value].length <= 4) {
      gameOver = true;
      outputMessage("Game Over");
      return;
    }
  });
  if (playerCardOne.cardValue > playerCardTwo.cardValue) {
    outputMessage("Player 1 Wins");
    players[0] = players[0].concat(pot);
  } else if (playerCardOne.cardValue < playerCardTwo.cardValue) {
    outputMessage("Player 2 Wins");
    players[1] = players[1].concat(pot);
  } else {
    resolveTie(pot);
  }
}

function resolveTie(pot) {
  let playerCardOne, playerCardTwo;
  //Position is important for tie UI so the cards will stack
  //Card is declared in css as poition absolute
  //Under normal conditions, no tie, no value will be passed
  let position = pot.length / 2;

  if (players[0].length < 4 || players[1].length < 4) {
    gameOver = true;
    outputMessage("Game Over");
    return;
  } else {
    for (var i = 0; i < 4; i++) {
      playerCardOne = players[0].shift();
      pot = pot.concat(playerCardOne);
      playerOne.innerHTML += showCard(playerCardOne, position + i);
    }
    for (var i = 0; i < 4; i++) {
      playerCardTwo = players[1].shift();
      pot = pot.concat(playerCardTwo);
      playerTwo.innerHTML += showCard(playerCardTwo, position + i);
    }
    checkWinner(playerCardOne, playerCardTwo, pot);
  }
}

function showCard(card, position) {
  //Move cards by pixel designation to allow them ot
  let stackCards = position * 40;
  let playedCard = `<div class="individualCard ${card.suit}" style="left:${stackCards}px">
     <div class="cardTop suit">${card.num}<br></div>
     <div class="cardMid suit"></div>
     <div class="cardBottom suit">${card.num}<br></div>
     </div>`;
  return playedCard;
}

//Build a deck of Cards
function buildCards() {
  //Declaration of an empty card array
  cards = [];
  for (suit in suits) {
    var suitNew = suits[suit][0].toUpperCase();
    for (numberValue in cardValues) {
      //Build the card object
      var card = {
        suit: suits[suit],
        num: cardValues[numberValue],
        cardValue: parseInt(numberValue) + 2,
        icon: suitNew
      };
      //Add the card to the Cards Array
      cards.push(card);
    }
  }
}

//Passing in the array of cards from build deck and shuffling them
function shuffleCards(array) {
  //Take the original array length and decrement by one to randomize order
  for (let cardArray = array.length - 1; cardArray > 0; cardArray--) {
    let key = Math.floor(Math.random() * (cardArray + 1));
    let temp = array[cardArray];
    array[cardArray] = array[key];
    array[key] = temp;
  }
  return array;
}

//Modulous operator to see if the deck has been dealt to the multi dimensional array ie. players
//Building the individual players decks (array of cards)
function dealCards(array) {
  for (let cards = 0; cards < array.length; cards++) {
    let playerKey = cards % 2;
    players[playerKey].push(array[cards]);
  }
}
