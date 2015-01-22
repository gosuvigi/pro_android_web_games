/**
 * Created by vigi on 1/3/2015.
 */

function SheptikaModel(numberOfPlayers, firstPlayer) {
    this._players = new Array();
    for (var i = 0; i < numberOfPlayers; i++) {
        var player = new Player(i);
        this._players.push(player);
    }
    this._firstPlayer = firstPlayer;
    this._remainingCards = this._shuffledDeck();
    this._rounds = new Array();
    this._rounds.push(this._firstRound());
}

_p = SheptikaModel.prototype;

P._firstRound = function() {
    var round = new GameRound(this._firstPlayer);
    return round;
};

/**
 * Build an ordered deck of cards for the game of Sheptika.
 *
 * @returns {Array}
 */
_p._orderedDeck = function () {
    var deck = new Array();
    for (var suite = 0; suite < Card.SUITES.length; suite++) {
        for (var rank = 7; rank < 15; rank++) {
            var c = new Card(rank, suite);
            deck.push(c);
        }
    }
    return deck;
};

/**
 * Builds a shuffled deck using the simple Fisher-Yates algorithm.
 *
 * @returns {*} The shuffled deck of cards
 */
_p._shuffledDeck = function () {
    var deck = this.orderedDeck();
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var t = deck[i];
        deck[i] = deck[j];
        deck[j] = t;
    }
    return deck;
};

