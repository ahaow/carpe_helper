"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throttle(fn, wait) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
    let timeout;
    let last;
    return function () {
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _self = this;
        let _args = arguments;
        let now = +Date.now();
        if (last && now < last + wait) {
            if (timeout !== null) {
                clearTimeout(timeout);
            }
            setTimeout(() => {
                last = now;
                fn.apply(_self, _args);
            }, wait);
        }
        else {
            last = now;
            fn.apply(_self, _args);
        }
    };
}
exports.default = throttle;
