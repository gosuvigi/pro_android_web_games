/**
 * Created by vigi on 12/31/2014.
 */

function Ball(radius, color) {
    this.radius = radius;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.vx = 300;
    this.vy = 300;
    this.xSgn = 1;
    this.ySgn = 1;
    this.mass = radius;
}

_b = Ball.prototype;

_b.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
};

_b.getPos2D = function () {
    return new Vector2D(this.x, this.y);
};

_b.getVelo2D = function () {
    return new Vector2D(this.vx, this.vy);
};

_b.setPos2D = function (pos) {
    this.x = pos.x;
    this.y = pos.y;
};

_b.setVelo2D = function (velo) {
    this.vx = velo.x;
    this.vy = velo.y;
};

function Vector2D(x, y) {
    this.x = x;
    this.y = y;
}

_v = Vector2D.prototype;

_v.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

_v.subtract = function (vec) {
    return new Vector2D(this.x - vec.x, this.y - vec.y);
};

/**
 * Gives the length of the projection of vector in the direction of vec.
 *
 * @param vec
 * @returns {*}
 */
_v.projection = function (vec) {
    var length = this.length();
    var lengthVec = vec.length();
    var proj;
    if ((length == 0) || (lengthVec == 0)) {
        proj = 0;
    } else {
        proj = (this.x * vec.x + this.y * vec.y) / lengthVec;
    }
    return proj;
};

_v.project = function (vec) {
    return vec.para(this.projection(vec));
};

/**
 * Gives a vector parallel to vector and of length mag.
 * @param mag
 * @param positive
 * @returns {Vector2D}
 */
_v.para = function (mag, positive) {
    if (typeof(positive) === 'undefined') {
        positive = true;
    }

    var length = this.length();
    var vec = new Vector2D(this.x, this.y);
    if (positive) {
        vec.scaleBy(mag / length);
    } else {
        vec.scaleBy(-mag / length);
    }
    return vec;
};

_v.addScaled = function (vec, k) {
    return new Vector2D(this.x + k * vec.x, this.y + k * vec.y);
}
