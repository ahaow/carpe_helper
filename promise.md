## 初始化结构

```js
// let promise = new Promise((resolve, reject) => {})

class MyPromise {
  constructor(func) {
    func(this.resolve, this.reject);
  }
  resolve() {}
  reject() {}
}
```

### promise 状态

promise 有三种状态：`pending`, `fulfilled`, `rejected`

初始化状态为`pending`, `pending`可以转为`fulfilled`, 但是`fulfilled`不能逆转, 同样可以转为`rejected`, 但是`reject`同样不能逆转

```js
class MyPromise {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  constructor(func) {
    this.status = MyPromise.PENDING;
    func(this.resolve, this.reject);
  }
  resolve() {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
    }
  }
  reject() {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
    }
  }
}
```

### resolve, reject 可以传入一个参数

```js
let promise = new Promise((resolve, reject) => {
  resolve("成功");
});

// 设置result
class MyPromise {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  constructor(func) {
    this.status = MyPromise.PENDING;
    this.result = null;
    func(this.resolve.bind(this), this.reject.bind(this));
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
}
```

## then

then 在创建实例后调用, onFULFILLED 表示成功, onREJECT 表示拒绝

```js
let promise = new Promise((resolve, reject) => {
    resolve('成功')
    reject('失败')
})
promise.then(
    result => console.log(result)
    result => console.log(result)
)

// then 方法里面只会执行成功或失败状态其中一种
```

```js
// MyPromise

class MyPromise {
  static PENDING = "待定";
  static FULFILLED = "成功";
  static REJECTED = "拒绝";
  constructor(func) {
    this.status = MyPromise.PENDING;
    this.result = null;
    func(this.resolve.bind(this), this.reject.bind(this));
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
  then(onFULFILLED, onREJECT) {
    if (this.status === MyPromise.FULFILLED) {
      onFULFILLED(this.result);
    }
    if (this.status === MyPromise.REJECTED) {
      onREJECT(this.result);
    }
  }
}
let p1 = new MyPromise((resolve, reject) => {
  resolve("resolve");
  resolve("reject");
});
p1.then(
  (reslove) => {
    console.log(reslove);
  },
  (reject) => {
    console.log(reject);
  }
);
```

## 执行异常

1. error

```js
let prmoise = new Promise((resolve, reject) => {
  throw new Error("error");
});

prmoise.then((result) => {
  console.log(result);
});
// 解决方法：使用try catch 在执行方法 捕获异常
```

2. 原生 promise 规定 then 里面的两个参数如果不是函数的话就要被忽略

```js
let prmoise = new Promise((resolve, reject) => {
  throw new Error("error");
});

prmoise.then(undefined, (result) => {
  console.log(result);
});
// 解决方法：把不是函数的参数改为函数

onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : () => {};
onREJECT = typeof onREJECT === "function" ? onREJECT : () => {};
```

## 第一步总结

```js
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
```

## 异步

```js
then(onFULFILLED, onREJECT) {
    // 执行异常2: 原生promise规定then里面的两个参数如果不是函数的话就要被忽略
    onFULFILLED = typeof onFULFILLED === "function" ? onFULFILLED : () => { }
    onREJECT = typeof onREJECT === "function" ? onREJECT : () => { }
    console.log('this.status', this.status)
    if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
            onFULFILLED(this.result)
        });
    }
    if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
            onREJECT(this.result)
        });
    }
}
```

```js
// 原生promise
console.log("第一步");
let promise = new Promise((resolve, reject) => {
  console.log("第二步");
  setTimeout(() => {
    resolve("成功");
    console.log("第四步");
  });
  // reject('失败')
});
promise.then(
  (result) => console.log(result),
  (result) => console.log(result)
);
console.log("第三步");
```

```js
// 手写promise

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

// 并没有输出 "成功"
```
**why?**

1. 因为先执行了`then`方法, 而使用了`setTimeout`异步任务后，该任务则被放入了任务队列里
2. `then`方法是个微任务, `setTimeout`是宏任务, `then`方法要先执行
3. `then`方法执行时, `status`状态还是等待状态, 所以没有输出`成功`




