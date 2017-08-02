import Rect from './Rect';
import ImageLoader from '../core/ImageLoader';

class ImageShape extends Rect {

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.fillStyle = 'cover';
        this.callbacks = {
            success: [],
            error: []
        };
    }

    load(url) {
        ImageLoader.load(url, result => {
            if (result.code !== 0) {
                let func = this.callbacks.error.shift();
                while (func) {
                    func && func(this);
                    func = this.callbacks.error.shift();
                }
                return false;
            }
            let image = result.target;
            if (this.fillStyle === 'cover') {
                let scale = Math.min(image.width / this.width, image.height / this.height);
                this.setCanvasWidth(~~image.width);
                this.setCanvasHeight(~~image.height);
                this.setRadius(this.radius.topLeft * scale, this.radius.topRight * scale, this.radius.bottomLeft * scale, this.radius.bottomRight * scale);
            }
            this.clearCanvas();
            this.drawRadius();
            this.fillImage(image);
            let func = this.callbacks.success.shift();
            while (func) {
                func && func(this);
                func = this.callbacks.success.shift();
            }
        });
        return this;
    }

    then(suc, err) {
        suc && this.callbacks.success.push(suc);
        err && this.callbacks.success.push(err);
    }

    fillImage(image) {
        let context = this.canvas.getContext('2d');
        let pattern = context.createPattern(image, 'no-repeat');
        context.fillStyle = pattern;
        context.fill();
    }
}

export default ImageShape;
