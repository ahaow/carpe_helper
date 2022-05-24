class MyPromise {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  constructor(func) {
    this.status = MyPromise.PENDING;
    this.result = null;
    // 执行异常 error
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(result) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.result = result;
    }
  }
  reject(result) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.result = result;
    }
  }
  // then在创建实例后调用, onFULFILLED表示成功, onREJECT表示拒绝
  then(onFULFILLED, onREJECT) {
    // 执行异常2: 原生promise规定then里面的两个参数如果不是函数的话就要被忽略
    onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : () => {};
    onREJECT = typeof onREJECT === "function" ? onREJECT : () => {};

    if (this.status === MyPromise.FULFILLED) {
      onFULFILLED(this.result);
    }
    if (this.status === MyPromise.REJECTED) {
      onREJECT(this.result);
    }
  }
}

// console.log("第一步");
// let promise = new Promise((resolve, reject) => {
//   console.log("第二步");
//   setTimeout(() => {
//     resolve("成功");
//     console.log("第四步");
//   });
//   // reject('失败')
// });
// promise.then(
//   (result) => console.log(result),
//   (result) => console.log(result)
// );
// console.log("第三步");


console.log('第一步')
let p1 = new MyPromise((resolve, reject) => {
    console.log('第二步')
    // resolve('reject')
    setTimeout(() => {
        console.log('1', p1.status)
        resolve('成功')
        console.log('2', p1.status)
        console.log('第四步')
    })
})
p1.then(
    reslove => { console.log('3', p1.status), console.log(reslove) },
    reject => { console.log(reject) },
)
console.log('第三步')
