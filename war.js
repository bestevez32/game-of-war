window.onload = function() {
  const suits = ["spades", "diams", "hearts", "clubs"];
  const cardFace = [
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
  let cards = [];
  let players = [[], []];
  let firstRun = true;
  let gameOver = false;
  const warButton = document.querySelector("#btnWar");
  const p1 = document.querySelector("#player1 .hand");
  const p2 = document.querySelector("#player2 .hand");
  const s1 = document.querySelector("#player1Score");
  const s2 = document.querySelector("#player2Score");

  //event listener
  warButton.addEventListener("click", goToWar);

  //functions
  function goToWar() {
    if (firstRun) {
      firstRun = false;
      buildCards();
      shuffleArray(cards);
      dealCards(cards);
    }

    attack();
  }

  function attack() {
    if (!gameOver) {
      var card1 = players[0].shift();
      var card2 = players[1].shift();
      var pot = [card1, card2];
      //Update HTML
      p1.innerHTML = showCard(card1, 0);
      p2.innerHTML = showCard(card2, 0);
      //Check Winners
      checkWinner(card1, card2, pot);
      //Update Scores
      s1.innerHTML = players[0].length;
      s2.innerHTML = players[1].length;
    } else {
      outputMessage("Game Over");
    }
  }

  function outputMessage(message) {
    document.getElementById("message").innerHTML = message;
  }

  function checkWinner(card1, card2, pot) {
    if (players[0].length <= 4 || players[1].length <= 4) {
      gameOver = true;
      outputMessage("Game Over");
      return;
    }
    if (card1.cardValue > card2.cardValue) {
      outputMessage("Player 1 Wins");
      players[0] = players[0].concat(pot);
    } else if (card1.cardValue < card2.cardValue) {
      outputMessage("Player 2 Wins");
      players[1] = players[1].concat(pot);
    } else {
      battlemode(pot);
      outputMessage("Tie");
    }
  }

  function battlemode(pot) {
    var card1, card2;
    var pos = pot.length / 2;
    if (players[0].length < 4 || players[1].length < 4) {
      gameOver = true;
      outputMessage("Game Over");
      return;
    } else {
      for (var i = 0; i < 4; i++) {
        card1 = players[0].shift();
        pot = pot.concat(card1);
        p1.innerHTML += showCard(card1, pos + i);
      }
      for (var i = 0; i < 4; i++) {
        card2 = players[1].shift();
        pot = pot.concat(card2);
        p2.innerHTML += showCard(card2, pos + i);
      }
      checkWinner(card1, card2, pot);
    }
  }

  function showCard(c, p) {
    var move = p * 40;
    var bCard =
      '<div class="icard ' + c.suit + '" style="left:' + move + 'px">';
    bCard += '<div class="cardTop suit">' + c.num + "<br></div>";
    bCard += '<div class="cardMid suit"></div>';
    bCard += '<div class="cardBottom suit">' + c.num + "<br></div></div>";
    return bCard;
  }

  //Build a deck of Cards
  function buildCards() {
    cards = [];
    for (s in suits) {
      var suitNew = suits[s][0].toUpperCase();
      for (n in cardFace) {
        var card = {
          suit: suits[s],
          num: cardFace[n],
          cardValue: parseInt(n) + 2,
          icon: suitNew
        };
        cards.push(card);
      }
    }
  }

  //Modulous operator to see if the deck has been dealt to the multi dimensional array
  function dealCards(array) {
    for (var i = 0; i < array.length; i++) {
      var m = i % 2;
      players[m].push(array[i]);
    }
  }

  //Passing in the array of cards from build deck and shuffling them
  function shuffleArray(array) {
    for (var x = array.length - 1; x > 0; x--) {
      var ii = Math.floor(Math.random() * (x + 1));
      var temp = array[x];
      array[x] = array[ii];
      array[ii] = temp;
    }
    return array;
  }
};
