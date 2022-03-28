"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneDeep(target, map = new Map()) {
    if (typeof target === 'object') { // 引用类型才继续深拷贝
        let obj = Array.isArray(target) ? [] : {}; // 考虑数组
        //防止循环引用
        if (map.get(target)) {
            return map.get(target); // 有拷贝记录就直接返回
        }
        map.set(target, obj); // 没有就存储拷贝记录
        for (let key in target) {
            obj[key] = cloneDeep(target[key]);
        }
        return obj;
    }
    else {
        return target;
    }
}
exports.default = cloneDeep;
