// function throttle(fn: Function, wait: number) {
//     if (typeof fn !== 'function') {
//         throw new Error('fn is not a function')
//     }
//     let timeout: any
//     let last: any
//     return function () {
//         //@ts-ignore
//         // eslint-disable-next-line @typescript-eslint/no-this-alias
//         let _self = this
//         let _args = arguments
//         let now = +Date.now()
//         if (last && now - last < wait) {
//             if (timeout !== null) {
//                 clearTimeout(timeout)
//             }
//             setTimeout(() => {
//                 last = now
//             fn.apply(_self, _args)
//             }, wait);

//         } else {
//             last = now
//             fn.apply(_self, _args)
//         }
//     }
// }

function throttle(func: any, wait: number, options: any) {
  let timeout :any, context: null, args: IArguments | null, result: any;

  // 上一次执行回调的时间戳
  var previous = 0;

  // 无传入参数时，初始化 options 为空对象
  if (!options) options = {};

  var later = function () {
    // 当设置 { leading: false } 时
    // 每次触发回调函数后设置 previous 为 0
    // 不然为当前时间
    previous = options.leading === false ? 0 : +new Date();

    // 防止内存泄漏，置为 null 便于后面根据 !timeout 设置新的 timeout
    timeout = null;

    // 执行函数
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  // 每次触发事件回调都执行这个函数
  // 函数内判断是否执行 func
  // func 才是我们业务层代码想要执行的函数
  let throttled: any = function () {
    // 记录当前时间
    var now = +new Date();

    // 第一次执行时（此时 previous 为 0，之后为上一次时间戳）
    // 并且设置了 { leading: false }（表示第一次回调不执行）
    // 此时设置 previous 为当前值，表示刚执行过，本次就不执行了
    if (!previous && options.leading === false) previous = now;

    // 距离下次触发 func 还需要等待的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
    // 要么是没有传入 {leading: false}，且第一次触发回调，即立即触发
    // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
    // 之后便会把 previous 值迅速置为 now
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);

        // clearTimeout(timeout) 并不会把 timeout 设为 null
        // 手动设置，便于后续判断
        timeout = null;
      }

      // 设置 previous 为当前时间
      previous = now;

      // 执行 func 函数
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 最后一次需要触发的情况
      // 如果已经存在一个定时器，则不会进入该 if 分支
      // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
      // 间隔 remaining milliseconds 后触发 later 方法
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  // 手动取消
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  // 执行 _.throttle 返回 throttled 函数
  return throttled;
}

export default throttle;
