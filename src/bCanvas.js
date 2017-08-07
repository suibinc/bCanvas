import {createUUID} from './core/Tools';
import Director from './core/Director';

let instances = {};

class BCanvas {
    bind(dom, width, height) {
        let uuid = createUUID();
        let e = new Director(uuid).bind(dom, width, height);
        instances[uuid] = e;
        return e;
    }
}

let e = new BCanvas();
export default e;
