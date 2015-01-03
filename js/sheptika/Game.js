/**
 * Created by vigi on 1/2/2015.
 */
function Game(noOfPlayers) {
    this.noOfPlayers = noOfPlayers;
    this._renderer = new SheptikaRenderer();
}

_p = Game.prototype;

_p.aaa = function () {
    var that = this;
    setTimeout(function () {
        var deck = that.shuffledDeck();
        for (var i = 0; i < deck.length; i++) {
            var card = deck[i];
            that._renderer.drawCard(card, i * 50, 50);
        }
    }, 1000);
};

/**
 * Build an ordered deck of cards for the game of Sheptika.
 *
 * @returns {Array}
 */
_p.orderedDeck = function () {
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
_p.shuffledDeck = function () {
    var deck = this.orderedDeck();
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var t = deck[i];
        deck[i] = deck[j];
        deck[j] = t;
    }
    return deck;
};
