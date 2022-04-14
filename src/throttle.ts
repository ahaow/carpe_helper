function throttle(fn: Function, wait: number) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function')
    }
    let timeout: any
    let last: any
    return function () {
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let _self = this
        let _args = arguments
        let now = +Date.now()
        if (last && now < last + wait) {
            if (timeout !== null) {
                clearTimeout(timeout)
            }
            setTimeout(() => {
                last = now
            fn.apply(_self, _args)
            }, wait);

        } else {
            last = now
            fn.apply(_self, _args)
        }
    }
}

export default throttle