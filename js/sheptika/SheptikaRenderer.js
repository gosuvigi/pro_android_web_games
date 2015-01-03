/**
 * Created by vigi on 1/2/2015.
 */

function SheptikaRenderer() {
    var imageManager = new ImageManager();
    var that = this;
    imageManager.load({
        'cards': 'img/classic_13x4x560x780.png'
    }, function () {
        var frames = that._initCardFrames();
        that._spriteSheet = new SpriteSheet(imageManager.get('cards'), frames);
    });
}

_p = SheptikaRenderer.prototype;

SheptikaRenderer.CARD_WIDTH = 560;
SheptikaRenderer.CARD_HEIGHT = 780;
SheptikaRenderer.RESIZE_CARD_WIDTH = 140;
SheptikaRenderer.RESIZE_CARD_HEIGHT = 195;

_p.drawCard = function (card, x, y) {
    var cardIndex = (card._rank - 7) + 7 * card._suite + card._suite;
    console.log(card + ' index: ' + cardIndex);
    this._spriteSheet.drawFrame(ctx, cardIndex, x, y);
};

// 0 - 7, 8 - 15, 16 - 23, 24 - 31
_p._initCardFrames = function() {
    var cardWidth = SheptikaRenderer.CARD_WIDTH;
    var cardHeight = SheptikaRenderer.CARD_HEIGHT;
    var resizeWidth = SheptikaRenderer.RESIZE_CARD_WIDTH;
    var resizeHeight = SheptikaRenderer.RESIZE_CARD_HEIGHT;
    this._frames = [
        // clubs
        [cardWidth * 6, 0, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 7, 0, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 8, 0, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 9, 0, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 0, 0, cardWidth, cardHeight, resizeWidth, resizeHeight], // ace is the first in the png
        [cardWidth * 10, 0, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 11, 0, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 12, 0, cardWidth, cardHeight, resizeWidth, resizeHeight],
        // diamonds
        [cardWidth * 6, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 7, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 8, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 9, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 0, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 10, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 11, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 12, cardHeight, cardWidth, cardHeight, resizeWidth, resizeHeight],
        // hearts
        [cardWidth * 6, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 7, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 8, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 9, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 0, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 10, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 11, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 12, cardHeight * 2, cardWidth, cardHeight, resizeWidth, resizeHeight],
        // spades
        [cardWidth * 6, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 7, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 8, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 9, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 0, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 10, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 11, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight],
        [cardWidth * 12, cardHeight * 3, cardWidth, cardHeight, resizeWidth, resizeHeight]

    ];
    return this._frames;
};
