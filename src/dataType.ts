function dataType(value: any) {
    if (value === null) {
        return value + ""
    }
    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value) // 转成这样 [object, Object]
        let type = valueClass.split(" ")[1].split("") // 变成这样 ["O", "b", "j", "e", "c", "t", "]"]
        type.pop() // 再变成这样 ["O", "b", "j", "e", "c", "t"]
        return type.join().toLowerCase() // object
    } else {
        return typeof value
    }
}

export default dataType