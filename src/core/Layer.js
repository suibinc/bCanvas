class Layer {
    constructor(x, y, width, height) {
        this.canvas = null;
        this.group = [];
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }

    update() {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        let context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
        this.group.forEach(elem => {
            elem.draw && elem.draw();
            if (elem.canvas !== undefined && elem.canvas !== null) {
                context.drawImage(elem.canvas, elem.x, elem.y, elem.width, elem.height);
            }
        });
        return true;
    }

    addView(child) {
        this.group.push(child);
    }
}

export default Layer;
