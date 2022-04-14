"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function debounce(fn, wait) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
    let timeout;
    return function () {
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let self = this;
        let _args = arguments;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn.apply(self, _args);
        }, wait);
    };
}
exports.default = debounce;
