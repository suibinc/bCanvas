class Events {
    bind(elem, callback) {
        elem.addEventListener('click', e => {
            callback(e);
        });
    }
}

let e = new Events();
export default e;
