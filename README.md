# Image to canvas

## Why need this?

Images can be very big and scaled to fit a preset sized container. 
That'll lead to a problem (if you're careful enough):

> **The image looks a little blur and not as clear as it should be.**

And this plugin convert the image to canvas to solve this kind of situation.

## Install

Move the dist or minified version of script into your project. And use it directly.

```
<script src="$PATH/image2canvas.min.js"></script> 
```

Or you can import it by use ``require(image2canvas)`` to added it in your libs.

## Usage

### Call this by `new` it

``` 
var toCanvas = new Img2Canvas(options?) 
```

You can provide an ``options`` object. Here's an overview of the **default values**.

```
{
    selector: '[img-to-canvas]' // selector
    context: document // parent dom
    placeholder: 'src' // attribute hold the real src of image, which can be set to achieve the lazy load fn
}
```

Mark the img tag as the targets by adding the attribute `` img-to-canvas ``. (No need for this if selector's specified in options)

```
<img src="*" img-to-canvas>
```

init operation by call `init()`

```
toCanvas.init()
```

You can also recover all the canvas to its original img tag by destroying fn.

```
toCanvas.destroy()
```

Or maybe you need to refresh the target if you append a new image to the document or somehow.

```
toCanvas.refresh()
```


## Reminders

* The canvas need to be cloned by do drawImage again. Or the content inside no longer exists. You can do that simply by using `` toCanvas.convert(canvasNode) `` to do such thing.

## Lisence
MIT