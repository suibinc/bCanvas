let allowProperties = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scale: 1,
    opacity: 1,
    loop: false
};

class Animator {
    constructor(parent) {
        this.parent = parent;
        this.current = 0;
        this.duration = 0;
        this.animations = [];
        this.runStatus = false;
        this.lastFrame = {};
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
     *         duration: Number
     *         [from, percent, to]: Object
     *     }
     * ]
     */
    addAnimation(keyframes) {
        keyframes.duration = keyframes.duration || 0;
        for (let key in keyframes) {
            if (key === 'from' || key === 'to' || !isNaN(Number(key))) {
                let frame = keyframes[key];
                for (let k in allowProperties) {
                    frame[k] = frame[k] === undefined ? (allowProperties[k] || this.parent[k]) : frame[k];
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
            this.currentAnimation = {};
            // no animation.
            this.currStatus = {
                x: this.parent.x,
                y: this.parent.y,
                width: this.parent.width,
                height: this.parent.height,
                scale: 1,
                opacity: 1,
                loop: false
            };
            this.nextStatus = this.currStatus;
            this.lastFrame = this.nextStatus;
            this.runStatus = false;
            return;
        }
        this.current = 0;
        this.duration = this.currentAnimation.duration || 0;
        this.currStatus = this.currentAnimation.from;
        this.nextStatus = this.currentAnimation.to;
        this.runStatus = true;
    }

    nextFrame(delta) {
        if (!this.runStatus) {
            // 动画已结束
            return this.lastFrame;
        }

        this.current = this.current + delta;
        let percent = this.duration <= 0 ? 1 : (this.current / this.duration);
        if (percent >= 1) {
            percent = 1;
        }

        let scale = this.nextStatus.scale - this.currStatus.scale;
        let opacity = this.nextStatus.opacity - this.currStatus.opacity;
        scale = scale === 0 ? this.nextStatus.scale : scale * percent;

        let frame = {
            x: ~~(this.currStatus.x + (this.nextStatus.x - this.currStatus.x) * percent),
            y: ~~(this.currStatus.y + (this.nextStatus.y - this.currStatus.y) * percent),
            width: ~~(this.parent.width * scale),
            height: ~~(this.parent.height * scale),
            opacity: opacity === 0 ? this.nextStatus.opacity : (this.currStatus.opacity + opacity * percent),
            loop: false
        };

        if (percent >= 1) {
            // animation end. jump to next animation
            this.$animationEndEvent && this.$animationEndEvent(frame);
            this.nextAnimation();
        }

        this.lastFrame = frame;
        return frame;
    }

    isEnd() {
        if (this.current >= this.duration) {
            return true;
        }
        return false;
    }

    $animationEnd(callback) {
        this.$animationEndEvent = callback;
    }
}

export default Animator;
