export let raf = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

export function merge(source, obj) {
    for (let key in source) {
        if (obj[key] !== undefined) {
            source[key] = obj[key];
        }
    }
    return source;
}

export function throttle(action, delayTime) {
    let timeout = null;
    let lastRun = 0;
    return function (a) {
        if (timeout) return;
        let elapsed = (+new Date()) - lastRun;
        let args = arguments;
        let runCallback = function () {
            lastRun = +new Date();
            clearTimeout(timeout);
            timeout = null;
            action.apply(this, args);
        };
        if (elapsed >= delayTime) {
            runCallback();
        } else {
            timeout = setTimeout(runCallback, delayTime - elapsed);
        }
    };
}
