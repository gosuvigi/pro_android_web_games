/**
 * Created by vigi on 12/29/2014.
 */

function BoardRenderer(context, model) {
    this._ctx = context;
    this._model = model;

    this._cols = model.getCols();
    this._rows = model.getRows();

    // top left corner of the board
    this._x = 0;
    this._y = 0;

    // width and height of the board rectangle
    this._width = 0;
    this._height = 0;

    // the optimal size of the board cell
    this._cellSize = 0;
}

_p = BoardRenderer.prototype;

/**
 * Sets the new position and size of the board. Should call repaint to see the changes.
 * @param x
 * @param y
 * @param cellSize
 */
_p.setSize = function(x, y, cellSize) {
    this._x = x;
    this._y = y;
    this._cellSize = cellSize;
    this._width = this._cellSize * this._cols;
    this._height = this._cellSize * this._rows;
};

_p._drawBackground = function() {
    var ctx = this._ctx;

    // background
    var gradient = ctx.createLinearGradient(0, 0, 0, this._height);
    gradient.addColorStop(0, '#fffbb3');
    gradient.addColorStop(1, '#f6f6b2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this._width, this._height);

    // drawing curves
    var curveOffset = this._width / 6;
    ctx.strokeStyle = '#dad7ac';
    ctx.fillStyle = '#f6f6b2';

    // first curve
    ctx.beginPath();
    ctx.moveTo(curveOffset, this._height);
    ctx.bezierCurveTo(this._width + curveOffset * 3, -curveOffset, -curveOffset * 3, -curveOffset,
        this._width - curveOffset, this._height);
    ctx.fill();

    // second curve
    ctx.beginPath();
    ctx.moveTo(curveOffset, 0);
    ctx.bezierCurveTo(this._width + curveOffset * 3, this._height + curveOffset, -curveOffset * 3,
        this._height + curveOffset, this._width - curveOffset, 0);
    ctx.fill();
};

_p._drawGrid = function() {
    var ctx = this._ctx;
    ctx.beginPath();
    
    // draw horizontal lines
    for (var i = 0; i <= this._cols; i++) {
        ctx.moveTo(i * this._cellSize + 0.5, 0.5);
        ctx.lineTo(i * this._cellSize + 0.5, this._height + 0.5);
    }
    
    // draw vertical lines
    for (var j = 0; j <= this._rows; j++) {
        ctx.moveTo(0.5, j * this._cellSize + 0.5);
        ctx.lineTo(this._width + 0.5, j * this._cellSize + 0.5);
    }

    ctx.strokeStyle = '#ccc';
    ctx.stroke();
};

_p.drawToken = function(cellX, cellY) {
    var ctx = this._ctx;
    var cellSize = this._cellSize;
    var tokenType = this._model.getPiece(cellX, cellY);

    if (!tokenType) {
        return;
    }

    var colorCode = 'black';
    switch (tokenType) {
        case BoardModel.RED:
            colorCode = 'red';
            break;
        case BoardModel.GREEN:
            colorCode = 'green';
            break;
    }

    // center of the token
    var x = this._x + (cellX + 0.5) * cellSize;
    var y = this._y + (cellY + 0.5) * cellSize;
    ctx.save();
    ctx.translate(x, y);

    // token radius
    var radius = cellSize * 0.4;

    // center of gradient
    var gradientX = cellSize * 0.1;
    var gradientY = -cellSize * 0.1;

    var gradient = ctx.createRadialGradient(gradientX, gradientY, cellSize * 0.1,
        gradientX, gradientY, radius * 1.2);
    gradient.addColorStop(0, 'yellow');
    gradient.addColorStop(1, colorCode);
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.restore();
};

_p.repaint = function () {
    this._ctx.save();
    this._ctx.translate(this._x, this._y);
    this._drawBackground();
    this._drawGrid();
    this._ctx.restore();

    for (var i = 0; i < this._cols; i++) {
        for (var j = 0; j < this._rows; j++) {
            this.drawToken(i, j);
        }
    }
};