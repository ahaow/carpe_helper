// function debounce(fn: Function, wait: number) {
//     if (typeof fn !== 'function') {
//         throw new Error('fn is not a function')
//     }
//     let timeout: any
//     return function () {
//         //@ts-ignore
//         // eslint-disable-next-line @typescript-eslint/no-this-alias
//         let self = this
//         let _args = arguments
//         if (timeout !== null) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(() => {
//             fn.apply(self, _args)
//         }, wait);
//     }
// }


function debounce(fn: Function, wait: number, immediate: boolean) {
    // 定义一个时间器
    let timeout: any = null
    return function(...args: any) {
        let _self = this
        // 如果有时间器id就清除
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        // 实现第一次出发回调事件执行
        if (immediate && !timeout) {
            fn.apply(_self, args)
        }

        timeout = setTimeout(() => {
            fn.apply(_self, args)
        }, wait)

    } 
}

export default debounce