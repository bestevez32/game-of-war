/* 
  These are the test that will be executed
  1.buildCards()
  2.shuffleCards()
  3.dealCards()
  4.declareWar()
  5.outputMessage()
  6.checkWinner()
  7.resolveTie()
*/

describe("Starting Game Conditions", function() {
  it("is a new game", function() {
    expect(newGame).toBe(true);
  });
  it("game is not over", function() {
    expect(gameOver).toBe(false);
  });
});

describe("Card Builder", function() {
  it("suits are defined", function() {
    expect(suits).toBeDefined();
    expect(suits.length).toBe(4);
  });
  it("card values are defined", function() {
    expect(cardValues).toBeDefined();
    expect(cardValues.length).toBe(13);
  });
});

describe("Shuffle Cards", function() {
  beforeEach(async function() {
    await buildCards();
  });
  it("cards are passed as array with length of 52 and are shuffled", async function() {
    const result = cards;
    expect(result.length).toBe(52);
  });
});
