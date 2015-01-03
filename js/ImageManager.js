/**
 * Created by vigi on 12/30/2014.
 */

function ImageManager(placeholderDataUri) {
    //this._imagesQueue = [];
    this._images = {};
    if (placeholderDataUri) {
        this._placeholder = new Image();
        this._placeholder.src = placeholderDataUri;
    }
}

_p = ImageManager.prototype;

/**
 * Returns the loaded image by its alias.
 *
 * @param alias
 * @returns {*}
 */
_p.get = function (alias) {
    return this._images[alias];
};

/**
 * Initiates the loading of images.
 *
 * @param images
 * @param onDone
 * @param onProgress
 */
_p.load = function (images, onDone, onProgress) {
    // the images queue
    var queue = [];
    for (var im in images) {
        queue.push({
            key: im,
            path: images[im]
        });
    }

    if (queue.length == 0) {
        onProgress && onProgress(0, 0, null, null, true);
        onDone && onDone();
        return;
    }

    var itemCounter = {
        loaded: 0,
        total: queue.length
    };

    for (var i = 0; i < queue.length; i++) {
        this._loadItem(queue[i], itemCounter, onDone, onProgress);
    }
};

/**
 * Function that initiates the loading and sets onload and onerror callbacks for every image in the queue.
 *
 * @param queueItem
 * @param itemCounter
 * @param onDone
 * @param onProgress
 * @private
 */
_p._loadItem = function (queueItem, itemCounter, onDone, onProgress) {
    var self = this;
    var img = new Image();
    img.onload = function () {
        self._images[queueItem.key] = img;
        self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
    };
    img.onerror = function () {
        self._images[queueItem.key] == self._placeholder ? self._placeholder : null;
        self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
    };

    img.src = queueItem.path;
};

/**
 * Handles the result of loading the image, both success and failure.
 *
 * @param queueItem
 * @param itemCounter
 * @param onDone
 * @param onProgress
 * @param success
 * @private
 */
_p._onItemLoaded = function (queueItem, itemCounter, onDone, onProgress, success) {
    itemCounter.loaded++;
    onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
    if (itemCounter.loaded == itemCounter.total) {
        onDone && onDone();
    }
};
