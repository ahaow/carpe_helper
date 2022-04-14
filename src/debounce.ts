function debounce(fn: Function, wait: number) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function')
    }
    let timeout: any
    return function () {
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let self = this
        let _args = arguments
        if (timeout !== null) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            fn.apply(self, _args)
        }, wait);
    }
}

export default debounce