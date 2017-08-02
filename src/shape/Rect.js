import Base from './Base';

class Rect extends Base {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.id = 'test'; // todo delete
    }

    drawRadius() {
        let canvas = this.canvas;
        let context = canvas.getContext('2d');

        let width = this.width;
        let height = this.height;

        context.save();
        context.beginPath();
        context.moveTo(this.padding.left + this.radius.topLeft, this.padding.top);

        context.lineTo(width - this.padding.right - this.radius.topRight, this.padding.top);
        if (this.radius.topRight > 0) {
            // 右上角圆角
            context.arcTo(width - this.padding.right, this.padding.top, width - this.padding.right, this.padding.top + this.radius.topRight, this.radius.topRight);
        }

        context.lineTo(width - this.padding.right, height - this.padding.bottom - this.radius.bottomRight);
        if (this.radius.bottomRight > 0) {
            // 右下角圆角
            context.arcTo(width - this.padding.right, height - this.padding.bottom, width - this.padding.right - this.radius.bottomRight, height - this.padding.bottom, this.radius.bottomRight);
        }

        context.lineTo(this.padding.left + this.radius.bottomLeft, height - this.padding.bottom);
        if (this.radius.bottomLeft > 0) {
            // 左下角圆角
            context.arcTo(this.padding.left, height - this.padding.bottom, this.padding.left, height - this.padding.bottom - this.radius.bottomLeft, this.radius.bottomLeft);
        }

        context.lineTo(this.padding.left, this.padding.top + this.radius.topLeft);
        if (this.radius.topLeft > 0) {
            // 右上角圆角
            context.arcTo(this.padding.left, this.padding.top, this.padding.left + this.radius.topLeft, this.padding.top, this.radius.topLeft);
        }

        context.closePath();
        context.restore();
    }
}

export default Rect;
