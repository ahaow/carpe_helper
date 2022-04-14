function isObject(source: any) {
  return typeof source === "object" && source !== null;
}

function cloneDeep(source: any, hash = new WeakMap()) {
  if (!isObject(source)) return source; // 引用类型才继续深拷贝
  //防止循环引用
  if (hash.has(source)) {
    return hash.get(source); // 有拷贝记录就直接返回
  }
  // 考虑数组
  let target: any = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  Reflect.ownKeys(source).forEach((key) => {
    if (isObject(source[key])) {
      target[key] = cloneDeep(source[key], hash);
    } else {
      target[key] = source[key];
    }
  });
  return target;
}

export default cloneDeep;
