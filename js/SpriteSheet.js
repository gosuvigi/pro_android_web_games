/**
 * Created by vigi on 12/30/2014.
 */

/**
 *
 * @param image the image object to use for drawing
 * @param frames the array describing the frames of the sprite sheet in a
 format:
 * [
 * [x, y, width, height, anchorX, anchorY] // - frame 1
 * [x, y, width, height, anchorX, anchorY] // - frame 2
 * ...
 * ]
 * @constructor
 */
function SpriteSheet(image, frames) {
    this._image = image;
    this._frames = frames;
}

_p = SpriteSheet.prototype;

SpriteSheet.FRAME_X = 0;
SpriteSheet.FRAME_Y = 1;
SpriteSheet.FRAME_WIDTH = 2;
SpriteSheet.FRAME_HEIGHT = 3;
SpriteSheet.FRAME_ANCHOR_X = 4;
SpriteSheet.FRAME_ANCHOR_Y = 5;

/**
 * Draws the frame of the sprite sheet in the given coordinates of the context.
 * @param ctx The context to draw at
 * @param index The index of the frame
 * @param x The x coordinate where the anchor will appear
 * @param y The y coordinate where the anchor will appear
 */
_p.drawFrame = function (ctx, index, x, y) {
    var frame = this._frames[index];
    if (!frame) {
        return;
    }

    ctx.drawImage(this._image,
        frame[SpriteSheet.FRAME_X], frame[SpriteSheet.FRAME_Y],
        frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT],
        x - frame[SpriteSheet.FRAME_ANCHOR_X],
        y - frame[SpriteSheet.FRAME_ANCHOR_Y],
        frame[SpriteSheet.FRAME_WIDTH], frame[SpriteSheet.FRAME_HEIGHT]);
};