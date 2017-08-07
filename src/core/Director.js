import {raf, throttle} from './Utils';
import Event from './Events';
import Layer from './Layer';

class Director {
    constructor() {
        this.layers = {}; // 画布渲染层数，可用于单独重绘某些层级
        this.needsUpdate = true;
        this.lastTime = 0;
        this.runStatus = {
            fps: 0,
            loop: false,
            pause: true
        };
    }

    __checkOffScreenCanvas() {
        if (!this.offScreenCanvas) {
            this.offScreenCanvas = document.createElement('canvas');
            this.offScreenCanvas.width = this.width;
            this.offScreenCanvas.height = this.height;
            this.offScreenRender = this.offScreenCanvas.getContext('2d');
        }
    }

    bind(elem, width, height) {
        this.width = ~~width;
        this.height = ~~height;

        elem.width = this.width;
        elem.height = this.height;
        this.onScreenCanvas = elem;
        this.onScreenRender = this.onScreenCanvas.getContext('2d');
        this.__checkOffScreenCanvas();

        this.updateFpsWithThrottle = throttle((delta) => {
            this.runStatus.fps = (1000 / delta).toFixed(2);
        }, 200);

        Event.bind(elem, e => {
            let keys = Object.keys(this.layers);
            keys.sort((a, b) => {
                return b - a;
            });
            keys.forEach(key => {
                let layer = this.layers[key];
                layer.$dispatch(e);
            });
        });
        return this;
    }

    needsRedraw() {
        this.needsUpdate = true;
    }

    update(delta) {
        if (!this.needsUpdate) {
            this.draw();
            return false;
        }
        this.needsUpdate = false;

        this.offScreenRender.clearRect(0, 0, this.width, this.height);

        let keys = Object.keys(this.layers);
        keys.sort((a, b) => {
            return a - b;
        });
        keys.forEach(key => {
            let layer = this.layers[key];
            this.needsUpdate = this.needsUpdate || layer.update(delta);
            this.offScreenRender.drawImage(layer.canvas, layer.x, layer.y, layer.width, layer.height);
        });
        this.draw();
    }

    draw() {
        this.onScreenRender.clearRect(0, 0, this.width, this.height);
        this.onScreenRender.drawImage(this.offScreenCanvas, 0, 0);
        this.onScreenRender.fillText('FPS : ' + this.runStatus.fps, 20, 20);
    }

    loop(delta = 0) {
        if (!this.runStatus.pause) {
            this.update(delta);
        }
        raf((t) => {
            let delta = t - this.lastTime;
            this.updateFpsWithThrottle(delta);
            this.lastTime = t;
            this.loop(delta);
        });
    }

    start() {
        if (this.runStatus.loop) {
            console.log('loop is running.');

            return;
        }
        this.runStatus.loop = true;
        this.runStatus.pause = false;
        this.loop();
    }

    pause() {
        this.runStatus.pause = true;
    }

    resume() {
        this.runStatus.pause = false;
    }

    destroy() {
        this.pause();
        this.layers = {};
    }

    getLayer(level, create) {
        if (this.layers[level] === undefined && create) {
            this.layers[level] = new Layer(0, 0, this.width, this.height).setParent(this);
        }
        return this.layers[level];
    }

    addLayer(config, level) {
        level = level || config.level || 0;
        if (this.getLayer(level) !== undefined) {
            console.warn('the layer is exists.');
            return false;
        }
        this.layers[level] = new Layer(config.x || 0, config.y || 0, config.width || 0, config.height || 0).setParent(this);
        this.needsRedraw();
    }

    addView(child, config) {
        if (config === undefined) {
            config = {
                level: 0
            };
        }
        if (typeof config === 'number') {
            config = {
                level: config
            };
        }
        let level = config.level || 0;
        this.getLayer(level, true).addView(child);
    }
}

export default Director;
