class Base {
    constructor(x, y, width, height) {
        this.parent = null;
        this.needsUpdate = true;
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

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    needsRedraw() {
        this.needsUpdate = true;
        this.parent && this.parent.needsRedraw && this.parent.needsRedraw();
    }

    draw() {
        if (!this.needsUpdate) {
            return false;
        }
        this.needsUpdate = this.onDraw(this.canvas);
        return true;
    }

    clearCanvas() {
        this.getBaseContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setWidth(width) {
        width = Math.floor(width);
        this.width = width;
        return this;
    }

    setCanvasWidth(width) {
        width = Math.floor(width);
        this.canvas.width = width;
        return this;
    }

    setHeight(height) {
        height = Math.floor(height);
        this.height = height;
        return this;
    }

    setCanvasHeight(height) {
        height = Math.floor(height);
        this.canvas.height = height;
        return this;
    }

    setRadius(topLeft, topRight, bottomLeft, bottomRight) {
        this.radius.topLeft = ~~topLeft || 0;
        this.radius.topRight = ~~topRight || 0;
        this.radius.bottomLeft = ~~bottomLeft || 0;
        this.radius.bottomRight = ~~bottomRight || 0;
        return this;
    }

    setPadding(top, right, bottom, left) {
        this.padding.top = ~~top || 0;
        this.padding.right = ~~right || 0;
        this.padding.bottom = ~~bottom || 0;
        this.padding.left = ~~left || 0;
        return this;
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
