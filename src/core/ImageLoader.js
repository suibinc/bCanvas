class ImageLoader {
    constructor() {
        this.mapper = {};
        this.images = {};
        console.log(this.createUUID());
    }

    destroy() {
        delete this.mapper;
        delete this.images;
    }

    createUUID() {
        let uuid = [];
        let hexDigits = '0123456789abcdef';
        for (let i = 0; i < 36; i++) {
            uuid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }

        uuid[14] = '4';
        uuid[19] = hexDigits.substr((uuid[19] & 0x3) | 0x8, 1);
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';

        return uuid.join('');
    }

    read(...alias) {
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

    load(url, callback, alias) {
        if (url === undefined) {
            console.warn('image src is undefined.');
            return;
        }
        if (this.mapper[url] !== undefined) {
            callback && callback(this.read(url));
            return;
        }
        if (alias) {
            if (this.mapper[alias] !== undefined) {
                callback && callback(this.read(alias));
                return;
            }
        }
        ((url, callback, alias) => {
            let image = new Image();
            image.onload = () => {
                let uuid = this.createUUID();
                this.images[uuid] = image;
                this.mapper[url] = uuid;
                alias && (this.mapper[alias] = uuid);
                callback && callback(image);
            };
            image.onerror = () => {
                console.log(`load image(${url}) error.`);
            };
            image.src = url;
        })(url, callback, alias);
    }
}

let imageLoader = new ImageLoader();
export default imageLoader;
