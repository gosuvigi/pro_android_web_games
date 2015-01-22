/**
 * Created by vigi on 1/2/2015.
 */
function Game(numberOfPlayers) {
    this.noOfPlayers = numberOfPlayers;
    this._renderer = new SheptikaRenderer();
    this._model = new SheptikaModel(numberOfPlayers);

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

