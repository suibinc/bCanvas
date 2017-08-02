import {raf, throttle} from './Tools';
import Layer from './Layer';

class Director {
    constructor() {
        this.layers = {}; // 画布渲染层数，可用于单独重绘某些层级
        this.runStatus = {
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

    initial(elem, width, height) {
        this.width = ~~width;
        this.height = ~~height;

        elem.width = this.width;
        elem.height = this.height;
        this.onScreenCanvas = elem;
        this.onScreenRender = this.onScreenCanvas.getContext('2d');
        this.__checkOffScreenCanvas();

        this.updateWithThrottle = throttle(() => {
            this.update();
        }, 60);
    }

    update() {
        this.offScreenRender.clearRect(0, 0, this.width, this.height);

        let keys = Object.keys(this.layers);
        keys.sort((a, b) => {
            return a - b;
        });
        keys.forEach(key => {
            let layer = this.layers[key];
            layer.update();
            this.offScreenRender.drawImage(layer.canvas, layer.x, layer.y, layer.width, layer.height);
        });
        this.draw();
    }

    draw() {
        this.onScreenRender.drawImage(this.offScreenCanvas, 0, 0);
    }

    loop() {
        if (!this.runStatus.pause) {
            this.updateWithThrottle();
        }
        raf(() => {
            this.loop();
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
            this.layers[level] = new Layer(0, 0, this.width, this.height);
        }
        return this.layers[level];
    }

    addLayer(config, level) {
        level = level || config.level || 0;
        if (this.getLayer(level) !== undefined) {
            console.warn('the layer is exists.');
            return false;
        }
        this.layers[level] = new Layer(config.x || 0, config.y || 0, config.width || 0, config.height || 0);
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
