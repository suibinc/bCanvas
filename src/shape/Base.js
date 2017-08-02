class Base {
    constructor(x, y, width, height) {
        this.redraw = true;
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.radius = {
            topLeft: 0,
            topRight: 0,
            bottomLeft: 0,
            bottomRight: 0
        };
        this.padding = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
    }

    draw() {
        if (!this.redraw) {
            // 控制重绘，避免频繁的重绘带来的压力
            return false;
        }
        this.redraw = this.onDraw(this.canvas);
        return true;
    }

    setWidth(width) {
        width = Math.floor(width);
        this.width = width;
        this.canvas.width = width;
    }

    setHeight(height) {
        height = Math.floor(height);
        this.height = height;
        this.canvas.height = height;
    }

    setRadius(topLeft, topRight, bottomLeft, bottomRight) {
        this.radius.topLeft = topLeft || 0;
        this.radius.topRight = topRight || 0;
        this.radius.bottomLeft = bottomLeft || 0;
        this.radius.bottomRight = bottomRight || 0;
    }

    setPadding(top, right, bottom, left) {
        this.padding.top = top || 0;
        this.padding.right = right || 0;
        this.padding.bottom = bottom || 0;
        this.padding.left = left || 0;
    }

    onDraw(canvas) {
        return false;
    }

    getBaseCanvas() {
        return this.canvas;
    }

    getBaseContext() {
        return this.canvas.getContext('2d');
    }
}

export default Base;
