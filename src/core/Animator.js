let allowProperties = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    loop: false
};

class Animator {
    constructor(parent) {
        this.parent = parent;
        this.current = 0;
        this.duration = 0;
        this.animations = [];
        this.currentAnimation = {};
        this.currStatus = {};
        this.nextStatus = {};
        this.nextAnimation();
    }

    /**
     * 添加一个动画组合
     * @param keyframes Array
     * example:
     * [
     *     {
     *         duration:
     *         x:20
     *     }
     * ]
     */
    addAnimation(keyframes) {
        keyframes.duration = keyframes.duration || 0;
        for (let key in keyframes) {
            if (key === 'from' || key === 'to' || !isNaN(Number(key))) {
                let frame = keyframes[key];
                for (let k in allowProperties) {
                    frame[k] = frame[k] || this.parent[k] || allowProperties[k];
                }
            }
        }
        this.animations.push(keyframes);
        if (this.isEnd()) {
            this.nextAnimation();
        }
    }

    nextAnimation() {
        this.currentAnimation = this.animations.shift();
        if (this.currentAnimation === undefined) {
            // no animation.
            this.currStatus = {
                x: this.parent.x,
                y: this.parent.y,
                width: this.parent.width,
                height: this.parent.height,
                loop: false
            };
            this.nextStatus = this.currStatus;
            return;
        }
        this.current = 0;
        this.duration = this.currentAnimation.duration || 0;
        this.currStatus = this.currentAnimation.from;
        this.nextStatus = this.currentAnimation.to;
    }

    nextFrame(delta) {
        this.current = this.current + delta;
        let percent = this.duration <= 0 ? 1 : (this.current / this.duration);
        if (percent >= 1) {
            percent = 1;
        }
        let frame = {
            x: ~~(this.currStatus.x + (this.nextStatus.x - this.currStatus.x) * percent),
            y: ~~(this.currStatus.y + (this.nextStatus.y - this.currStatus.y) * percent),
            width: this.parent.width,
            height: this.parent.height,
            loop: false
        };
        if (percent >= 1) {
            // animation end. jump to next animation
            this.nextAnimation();
        }
        return frame;
    }

    isEnd() {
        if (this.current >= this.duration) {
            return true;
        }
        return false;
    }
}

export default Animator;
