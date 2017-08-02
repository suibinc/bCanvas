import Rect from './Rect';
import ImageLoader from '../core/ImageLoader';

class ImageShape extends Rect {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.fillStyle = 'cover';
    }

    load(url, done, ...args) {
        ImageLoader.load(url, (image) => {
            if (this.fillStyle === 'cover') {
                let scale = Math.min(image.width / this.width, image.height / this.height);
                this.setWidth(image.width);
                this.setHeight(image.height);
                this.setRadius(this.radius.topLeft * scale, this.radius.topRight * scale, this.radius.bottomLeft * scale, this.radius.bottomRight * scale);
            }
            this.getBaseContext().clearRect(0, 0, this.width, this.height);
            this.drawRadius();
            this.drawImage(image);
            if (done) {
                done.apply({}, args);
            }
        });
    }

    drawImage(image) {
        let context = this.canvas.getContext('2d');
        let pattern = context.createPattern(image, 'no-repeat');
        context.fillStyle = pattern;
        context.fill();
    }
}

export default ImageShape;
