/**
 * Created by vigi on 12/29/2014.
 */

function BoardModel(cols, rows) {
    this._cols = cols || 7;
    this._rows = rows || 6;
    this._data = [];
    this._currentPlayer = BoardModel.RED;
    this._totalTokens = 0;

    this.reset();
}

_p = BoardModel.prototype;

/**
 * Players
 * @type {number}
 */
BoardModel.EMPTY = 0;
BoardModel.RED = 1;
BoardModel.GREEN = 2;

/**
 * Game state after the turn
 */
// No win or draw
BoardModel.NONE = 0;
// The player who just dropped a piece has won
BoardModel.WIN = 1;
// No more free cells in the board - it is a draw
BoardModel.DRAW = 2;
// The last attempted move was illegal
BoardModel.ILLEGAL_TURN = 3;

_p.reset = function() {
    this._data = [];
    for (var i = 0; i < this._rows; i++) {
        this._data[i] = [];
        for (var j = 0; j < this._cols; j++) {
            this._data[i][j] = BoardModel.EMPTY;
        }
    }
    this._currentPlayer = BoardModel.RED;
    this._totalTokens = 0;
};

_p.getPiece = function(col, row) {
    return this._data[row][col];
};
_p.getCols = function() {
    return this._cols;
};
_p.getRows = function() {
    return this._rows;
};

_p.makeTurn = function (column) {
    // the color of the piece that we're dropping
    var piece = this._currentPlayer;

    // check if the column is valid
    if (column < 0 || column > this._cols) {
        return {
            status: BoardModel.ILLEGAL_TURN
        }
    }

    // check if there's the empty row in the given column,
    // if there's no empty row, then the turn is illegal
    var row = this._getEmptyRow(column);
    if (row == -1) {
        return {
            status: BoardModel.ILLEGAL_TURN
        }
    }

    // we found the empty row so we can drop the piece
    this._totalTokens++;
    this._data[row][column] = piece;

    this._toggleCurrentPlayer();

    // return the successful turn together with the new state of the game
    return {
        status: this._getGameState(column, row),
        x: column,
        y: row,
        piece: piece
    }
};

_p._getEmptyRow = function(column) {
    for (var i = this._rows - 1; i >= 0 ; i--) {
        if (!this.getPiece(column, i)) {
            return i;
        }
    }
    return -1;
};

_p._toggleCurrentPlayer = function () {
    if (this._currentPlayer == BoardModel.RED) {
        this._currentPlayer = BoardModel.GREEN;
    } else {
        this._currentPlayer = BoardModel.RED;
    }
};

/**
 *
 * @param column
 * @param row
 * @private
 */
_p._getGameState = function (column, row) {
    if (this._totalTokens == Game.BOARD_WIDTH * Game.BOARD_HEIGHT) {
        return BoardModel.DRAW;
    }

    for (var deltaX = -1; deltaX < 2; deltaX++) {
        for (var deltaY = -1; deltaY < 2; deltaY++) {
            if (deltaX == 0 && deltaY == 0) {
                continue;
            }
            var count = this._checkWinDirection(column, row, deltaX, deltaY) +
                        this._checkWinDirection(column, row, -deltaX, -deltaY) + 1;
            if (count >= 4) {
                return BoardModel.WIN;
            }
        }
    }

    return BoardModel.NONE;
};

/**
 * Calculates how many balls of the same color are present in a certain direction starting from the last dropped ball.
 *
 * @param column
 * @param row
 * @param deltaX
 * @param deltaY
 * @private
 */
_p._checkWinDirection = function (column, row, deltaX, deltaY) {
    var pieceColor = this.getPiece(column, row);
    var tokenCounter = 0;
    var c = column + deltaX;
    var r = row + deltaY;

    while (c >= 0 && r >=0 && c < this._cols && r < this._rows && this.getPiece(c, r) == pieceColor) {
        c += deltaX;
        r += deltaY;
        tokenCounter++;
    }
    return tokenCounter;
};


