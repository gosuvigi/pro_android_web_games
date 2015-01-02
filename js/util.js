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

window.requestAnimationFrame = (function(){
//Check for each browser
//@paul_irish function
//Globalises this function to work on any browser as each browser has a
//    different namespace for this
        return window.requestAnimationFrame || //Chromium
            window.webkitRequestAnimationFrame || //Webkit
            window.mozRequestAnimationFrame || //Mozilla Geko
            window.oRequestAnimationFrame || //Opera Presto
            window.msRequestAnimationFrame || //IE Trident
            function(callback, element){ //Fallback function
                return window.setTimeout(callback, 1000/60);
            }
})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
} )();
