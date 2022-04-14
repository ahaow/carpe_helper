"use strict";
/**
 *
 * @param url
 * @returns
 */
function getUrlParams(url) {
    const reg = /([^?&=]+)=([^?&=]+)/g;
    let obj = {};
    url.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
}
