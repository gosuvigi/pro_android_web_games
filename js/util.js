/**
 * Created by vigi on 12/28/2014.
 */

function extend(subConstructor, superConstructor) {
    subConstructor.prototype = Object.create(subConstructor.prototype, {
       constructor: {
           value: subConstructor,
           enumerable: false,
           writable: true,
           configurable: true
       }
    });
}
