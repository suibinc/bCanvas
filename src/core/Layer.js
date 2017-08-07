class Layer {
    constructor(x, y, width, height) {
        this.parent = null;
        this.group = [];
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.needsUpdate = true;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    setParent(parent) {
        this.parent = parent;
        return this;
    }

    $dispatch(e) {
        for (let i = this.group.length - 1; i >= 0; i--) {
            if (this.group[i].inArea(e.offsetX, e.offsetY, e)) {
                this.group[i].$clickEvent && this.group[i].$clickEvent(e);
            }
        }
    }

    needsRedraw() {
        this.needsUpdate = true;
        this.parent && this.parent.needsRedraw && this.parent.needsRedraw();
    }

    update(delta) {
        if (!this.needsUpdate) {
            return false;
        }
        this.needsUpdate = false;

        let context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.width, this.height);
        this.group.forEach(elem => {
            if (elem.draw) {
                this.needsUpdate = this.needsUpdate || elem.draw();
            }
            if (elem.canvas !== undefined && elem.canvas !== null) {
                let animator = elem.animator;
                let frame = animator.nextFrame(delta);
                context.drawImage(elem.canvas, frame.x, frame.y, elem.width, elem.height);
                this.needsUpdate = this.needsUpdate || !animator.isEnd();
            }
        });
        return this.needsUpdate;
    }

    addView(child) {
        child.setParent(this);
        this.group.push(child);
        this.needsRedraw();
    }
}

export default Layer;
