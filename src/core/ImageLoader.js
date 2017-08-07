import {createUUID} from './Utils';

class ImageLoader {

    constructor() {
        /**
         * mapper
         * {
         *     url or alias: uuid: String
         * }
         */
        this.mapper = {};
        /**
         * images
         * {
         *     uuid: {
         *         status: Number [0: 加载完成 1; 加载中 2+:加载出现错误]
         *         target: Object
         *         callback: Array
         *     }
         * }
         */
        this.images = {};
    }

    destroy() {
        delete this.mapper;
        delete this.images;
    }

    getImage(...alias) {
        let obj = this.readCache.apply(this, alias);
        if (obj && obj.status === 0) {
            return obj.image;
        }
        return null;
    }

    readCache(...alias) {
        if (alias.length > 0) {
            for (let i = 0, l = alias.length, uuid; i < l; i++) {
                uuid = this.mapper[alias[i]];
                if (uuid === undefined) {
                    continue;
                }
                if (this.images[uuid] === undefined) {
                    return null;
                }
                return this.images[uuid];
            }
        }
        return null;
    }

    load(url, callback, ...alias) {
        if (url === undefined) {
            console.warn('image src is undefined.');
            return false;
        }
        let target = this;
        let obj = this.readCache.apply(target, [url, ...alias]);
        if (obj) {
            let arg = {
                code: obj.status,
                target: obj.target
            };
            if (obj.status === 0) {
                callback && callback(arg);
                return true;
            } else if (obj.status === 1) {
                obj.callback.push(callback);
                return true;
            } else {
                callback && callback(arg);
                return false;
            }
        }

        let uuid = createUUID();
        let image = new Image();
        this.images[uuid] = {
            status: 1,
            target: image,
            callback: [callback]
        };
        this.mapper[url] = uuid;
        if (alias.length > 0) {
            alias.forEach(k => {
                this.mapper[k] = uuid;
            });
        }
        image.onload = () => {
            let elem = this.images[uuid];
            elem.status = 0;
            let func = elem.callback.shift();
            while (func) {
                func && func({
                    code: 0,
                    target: elem.target
                });
                func = elem.callback.shift();
            }
        };
        image.onerror = () => {
            this.images[uuid].status = 2;
            console.log('load image error', url);
        };
        image.src = url;
        return true;
    }
}

let imageLoader = new ImageLoader();
export default imageLoader;
