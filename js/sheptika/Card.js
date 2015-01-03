/**
 * Created by vigi on 1/2/2015.
 */
function Card(rank, suite) {
    this._rank = rank;
    this._suite = suite;
}

_p = Card.prototype;

_p.toString = function() {
    var s = 'error';
    switch (this._suite) {
        case 0:
            s = 'Clubs';
            break;
        case 1:
            s = 'Diamonds';
            break;
        case 2:
            s = 'Hearts';
            break;
        case 3:
            s = 'Spades'
            break;
    }
    return this._rank + ' ' + s;
};

Card.CLUBS = 0;
Card.DIAMONDS = 1;
Card.HEARTS = 2;
Card.SPADES = 3;

Card.SUITES = [Card.CLUBS, Card.DIAMONDS, Card.HEARTS, Card.SPADES];
