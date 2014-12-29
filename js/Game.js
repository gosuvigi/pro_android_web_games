/**
 * Created by vigi on 12/29/2014.
 */

function Game(canvas) {
    this._boardRect = null;
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._boardModel = new BoardModel();
    this._boardRenderer = new BoardRenderer(this._ctx, this._boardModel);
    this.handleResize();
}

_p = Game.prototype;

/**
 * This function repaints the whole UI. It is called in two cases, either in the constructor (to render the initial
 * board) or after the browser window has resized (to rerender the board because the canvas flushed the contents).
 */
_p.handleResize = function() {
    this._clearCanvas();
    this._boardRect = this._getBoardRect();
    this._boardRenderer.setSize(this._boardRect.x, this._boardRect.y, this._boardRect.cellSize);
    this._boardRenderer.repaint();
};

/**
 * Find the biggest possible area that fits, and then center the board on the screen.
 *
 * @private
 */
_p._getBoardRect = function() {
    var cols = this._boardModel.getCols();
    var rows = this._boardModel.getRows();
    var cellSize = Math.floor(Math.min(this._canvas.width / cols, this._canvas.height / rows));

    var boardWidth = cellSize * cols;
    var boardHeight = cellSize * rows;

    return {
        x: Math.floor((this._canvas.width - boardWidth) / 2),
        y: Math.floor(((this._canvas.head - boardHeight) / 2)),
        cellSize: cellSize
    }
};

/**
 * Every time the user taps the screen, this method translates the click
 * coordinates into the ID of the column and initiates the whole ‘‘new move’’ flow.
 * Valid moves update the UI: we draw the new piece in the position where it fell.
 * The last thing to do is to check the win condition.
 * @param x
 * @param y
 */
_p.handleClick = function(x, y) {
    var column = Math.floor((x - this._boardRect.x) / this._boardModel.cellSize);

    // Make the turn and check for the result
    var turn = this._boardModel.makeTurn(column);

    // If the turn was legal, update the board, draw the new piece
    if (turn.status != BoardModel.ILLEGAL_TURN) {
        this._boardRenderer.drawToken(turn.x, turn.y);
    }

    if (turn.status == BoardModel.WIN) {
        alert((turn.piece == BoardModel.RED ? 'red' : 'green') + " player won the match!");
        this._reset();
    }

    // If we have the draw, do the same
    if (turn.status == BoardModel.DRAW) {
        alert("It is a draw!");
        this._reset();
    }
};

_p._reset = function() {
    this._clearCanvas();
    this._boardModel.reset();
    this._boardRenderer.repaint();
};

_p._clearCanvas = function() {
    this._ctx.fillStyle = 'white';
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
};
