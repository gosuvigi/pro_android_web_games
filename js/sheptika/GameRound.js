/**
 * Created by vigi on 1/3/2015.
 */

function GameRound(firstPlayer) {
    this._firstPlayer = firstPlayer;
    this._playedCards = new Array();
}

_p = GameRound.prototype;

function playCard(card, player) {
    var hand = new Hand(card, player);
    this._playedCards.push(hand);
}

function Hand(card, player) {
    this._card = card;
    this._player = player;
}
