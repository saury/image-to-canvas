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
