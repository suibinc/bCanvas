// let allowProperties = {};

class Animator {
    constructor(parent) {
        this.parent = parent;
        this.current = 0;
        this.duration = 1000;
        this.x = 200;
        this.y = 100;
        this.startTime = +new Date();
    }

    addAnimate(options) {
    }

    nextFrame(delta) {
        this.current = this.current + delta;
        let p = this.current / this.duration;
        return {
            x: ~~(this.x + 200 * p),
            y: ~~this.y
        };
    }

    isEnd() {
        if (this.current > this.duration) {
            return true;
        }
        return false;
    }
}

export default Animator;
