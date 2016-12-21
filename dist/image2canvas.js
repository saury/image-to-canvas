(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.image2canvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Img2Canvas(options) {
    this.options = options || {};
    // default selector's the dom with attributes [img-to-canvas]
    this.targets = this.options.selector ? $$(this.options.selector, this.options.context) : $$('[img-to-canvas]');
    // attribute hold the real src of image, which can be set to achieve the lazy load fn
    this.placeholder = this.options.placeholder || 'src'; 
    // array holds the canvas which were convert with the img
    this.canvasGallary = [];
}

/**
 * Kick start
 */
Img2Canvas.prototype.init = function() {
    var _self = this,
        gallary = this.targets;
	for (var i = 0, len = gallary.length; i < len; i++) {
        !function(){
            var item = gallary[i];
            var src = item.getAttribute(_self.placeholder);
            var token = document.createElement('img');
            token.src = src;
            /**
             * do convert operation after the img loaded
             */
            token.onload = function(){
                // Todo: 0, 0 may be taken as an option
                var canvas = _self.convert(token, 0, 0, item.width, item.height),
                    container = item.parentNode;
                // Todo: may set up a function to store and restore all the attrs
                // set the real src of image as a attr to make destroy fn achievable
                canvas.setAttribute(_self.placeholder, src);
                _self.placeholder === 'src' || canvas.setAttribute('src',item.getAttribute('src'));
                container.insertBefore(canvas, item);
                item.remove();
                // store this canvas to the gallary
                _self.canvasGallary.push(canvas);
            };
        }(i);
    }
};

/**
 * convert the image to canvas. besides, it can be used to clone a canvas 
 * @param {node} image tag node
 * @param {number} dx
 * @param {number} dy
 * @param {number} width
 * @param {number} height
 * @returns canvas node
 */
Img2Canvas.prototype.convert = function(image, dx, dy, width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || image.width;
    canvas.height = height || image.height;
    canvas.getContext('2d').drawImage(image, dx || 0, dy || 0, canvas.width, canvas.height);
    return canvas;
};

/**
 * recover the canvas to images
 */
Img2Canvas.prototype.destroy = function() {
    var _self = this;
	this.canvasGallary.map(function(canvas){
        var container = canvas.parentNode;
        var image = document.createElement('img');
        image.setAttribute('src', canvas.getAttribute(_self.placeholder));
        // set the img to canvas attr back if needed
        _self.options.selector || image.setAttribute('img-to-canvas', '');
        _self.placeholder === 'src' || image.setAttribute(_self.placeholder, canvas.getAttribute('src'));
        container.insertBefore(image, canvas);
        canvas.remove();
    });
    this.canvasGallary = [];
};

/**
 * refresh fn
 */
Img2Canvas.prototype.refresh = function() {
	this.destroy();
    // refresh the targets
    this.targets = this.options.selector ? $$(this.options.selector, this.options.context) : $$('[img-to-canvas]');
    this.init();
};

/**
 * Easy dom selector
 * @param  {string} selector 
 * @param  {string} context  
 * @return {HTMLNodes}
 */
function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}

module.exports = Img2Canvas;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW1hZ2UyY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gSW1nMkNhbnZhcyhvcHRpb25zKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgLy8gZGVmYXVsdCBzZWxlY3RvcidzIHRoZSBkb20gd2l0aCBhdHRyaWJ1dGVzIFtpbWctdG8tY2FudmFzXVxyXG4gICAgdGhpcy50YXJnZXRzID0gdGhpcy5vcHRpb25zLnNlbGVjdG9yID8gJCQodGhpcy5vcHRpb25zLnNlbGVjdG9yLCB0aGlzLm9wdGlvbnMuY29udGV4dCkgOiAkJCgnW2ltZy10by1jYW52YXNdJyk7XHJcbiAgICAvLyBhdHRyaWJ1dGUgaG9sZCB0aGUgcmVhbCBzcmMgb2YgaW1hZ2UsIHdoaWNoIGNhbiBiZSBzZXQgdG8gYWNoaWV2ZSB0aGUgbGF6eSBsb2FkIGZuXHJcbiAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyIHx8ICdzcmMnOyBcclxuICAgIC8vIGFycmF5IGhvbGRzIHRoZSBjYW52YXMgd2hpY2ggd2VyZSBjb252ZXJ0IHdpdGggdGhlIGltZ1xyXG4gICAgdGhpcy5jYW52YXNHYWxsYXJ5ID0gW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBLaWNrIHN0YXJ0XHJcbiAqL1xyXG5JbWcyQ2FudmFzLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzLFxyXG4gICAgICAgIGdhbGxhcnkgPSB0aGlzLnRhcmdldHM7XHJcblx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGdhbGxhcnkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAhZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBnYWxsYXJ5W2ldO1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gaXRlbS5nZXRBdHRyaWJ1dGUoX3NlbGYucGxhY2Vob2xkZXIpO1xyXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgdG9rZW4uc3JjID0gc3JjO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogZG8gY29udmVydCBvcGVyYXRpb24gYWZ0ZXIgdGhlIGltZyBsb2FkZWRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRva2VuLm9ubG9hZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAvLyBUb2RvOiAwLCAwIG1heSBiZSB0YWtlbiBhcyBhbiBvcHRpb25cclxuICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSBfc2VsZi5jb252ZXJ0KHRva2VuLCAwLCAwLCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gaXRlbS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9kbzogbWF5IHNldCB1cCBhIGZ1bmN0aW9uIHRvIHN0b3JlIGFuZCByZXN0b3JlIGFsbCB0aGUgYXR0cnNcclxuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgcmVhbCBzcmMgb2YgaW1hZ2UgYXMgYSBhdHRyIHRvIG1ha2UgZGVzdHJveSBmbiBhY2hpZXZhYmxlXHJcbiAgICAgICAgICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKF9zZWxmLnBsYWNlaG9sZGVyLCBzcmMpO1xyXG4gICAgICAgICAgICAgICAgX3NlbGYucGxhY2Vob2xkZXIgPT09ICdzcmMnIHx8IGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3NyYycsaXRlbS5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoY2FudmFzLCBpdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBzdG9yZSB0aGlzIGNhbnZhcyB0byB0aGUgZ2FsbGFyeVxyXG4gICAgICAgICAgICAgICAgX3NlbGYuY2FudmFzR2FsbGFyeS5wdXNoKGNhbnZhcyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfShpKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBjb252ZXJ0IHRoZSBpbWFnZSB0byBjYW52YXMuIGJlc2lkZXMsIGl0IGNhbiBiZSB1c2VkIHRvIGNsb25lIGEgY2FudmFzIFxyXG4gKiBAcGFyYW0ge25vZGV9IGltYWdlIHRhZyBub2RlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkeFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZHlcclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICogQHJldHVybnMgY2FudmFzIG5vZGVcclxuICovXHJcbkltZzJDYW52YXMucHJvdG90eXBlLmNvbnZlcnQgPSBmdW5jdGlvbihpbWFnZSwgZHgsIGR5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aCB8fCBpbWFnZS53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xyXG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKGltYWdlLCBkeCB8fCAwLCBkeSB8fCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgcmV0dXJuIGNhbnZhcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiByZWNvdmVyIHRoZSBjYW52YXMgdG8gaW1hZ2VzXHJcbiAqL1xyXG5JbWcyQ2FudmFzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xyXG5cdHRoaXMuY2FudmFzR2FsbGFyeS5tYXAoZnVuY3Rpb24oY2FudmFzKXtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gY2FudmFzLnBhcmVudE5vZGU7XHJcbiAgICAgICAgdmFyIGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBjYW52YXMuZ2V0QXR0cmlidXRlKF9zZWxmLnBsYWNlaG9sZGVyKSk7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBpbWcgdG8gY2FudmFzIGF0dHIgYmFjayBpZiBuZWVkZWRcclxuICAgICAgICBfc2VsZi5vcHRpb25zLnNlbGVjdG9yIHx8IGltYWdlLnNldEF0dHJpYnV0ZSgnaW1nLXRvLWNhbnZhcycsICcnKTtcclxuICAgICAgICBfc2VsZi5wbGFjZWhvbGRlciA9PT0gJ3NyYycgfHwgaW1hZ2Uuc2V0QXR0cmlidXRlKF9zZWxmLnBsYWNlaG9sZGVyLCBjYW52YXMuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XHJcbiAgICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShpbWFnZSwgY2FudmFzKTtcclxuICAgICAgICBjYW52YXMucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2FudmFzR2FsbGFyeSA9IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHJlZnJlc2ggZm5cclxuICovXHJcbkltZzJDYW52YXMucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbigpIHtcclxuXHR0aGlzLmRlc3Ryb3koKTtcclxuICAgIC8vIHJlZnJlc2ggdGhlIHRhcmdldHNcclxuICAgIHRoaXMudGFyZ2V0cyA9IHRoaXMub3B0aW9ucy5zZWxlY3RvciA/ICQkKHRoaXMub3B0aW9ucy5zZWxlY3RvciwgdGhpcy5vcHRpb25zLmNvbnRleHQpIDogJCQoJ1tpbWctdG8tY2FudmFzXScpO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRWFzeSBkb20gc2VsZWN0b3JcclxuICogQHBhcmFtICB7c3RyaW5nfSBzZWxlY3RvciBcclxuICogQHBhcmFtICB7c3RyaW5nfSBjb250ZXh0ICBcclxuICogQHJldHVybiB7SFRNTE5vZGVzfVxyXG4gKi9cclxuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGNvbnRleHQpIHtcclxuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG4gICAgdmFyIGVsZW1lbnRzID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50cyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSW1nMkNhbnZhcztcclxuIl19
