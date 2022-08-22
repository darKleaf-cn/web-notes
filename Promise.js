const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise1 {
  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallback = [];
  onRejectedCallback = [];
  constructor(func) {
    if (typeof func !== 'function') {
      throw Error('');
    }
    func(this.resolve, this.rejected);
  }
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      console.log(this.onFulfilledCallback);
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()();
      }
    }
  };
  rejected = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()();
      }
    }
  };
  then(onFulfilled, onRejected) {
    // onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // onRejected =
    //   typeof onRejected === 'function'
    //     ? onRejected
    //     : (reason) => {
    //         throw Error(reason);
    //       };
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    const realOnRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new Promise1((resolve, rejected) => {
      // console.log(this.status, this.onFulfilledCallback, onFulfilled);
      if (this.status === FULFILLED) {
        setTimeout(() => {
          const x = realOnFulfilled(this.value);
          resolvePromise(promise2, x, resolve, rejected);
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          const x = realOnRejected(this.reason);
          resolvePromise(promise2, x, resolve, rejected);
        }, 0);
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            const x = realOnFulfilled(this.value);
            resolvePromise(promise2, x, resolve, rejected);
          }, 0);
        });
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            const x = realOnRejected(this.reason);
            resolvePromise(promise2, x, resolve, rejected);
          }, 0);
        });
      }
    });
    return promise2;
  }
  all(iterators) {
    const arr = Array.from(iterators);
    const len = arr.length;
    const result = [];
    let num = 0;
    return new Promise1((resolve, rejected) => {
      for (let i = 0; i < arr.length; i++) {
				if(arr[i] instanceof Promise1) {
					arr[i]
          .then((value) => {
            num++;
            result[i] = value;
            if (num === len) {
              resolve(result);
            }
          })
          .catch((e) => {
            rejected(e);
          });
				} else {
					num++;
					result[i] = arr[i];
					if (num === len) {
						resolve(result);
					}
				}
      }
    });
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new Error(''));
  }
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      resolve(x);
    }
    let then;
    try {
      then = x.then;
    } catch (e) {
      reject(e);
    }
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

// const a = new Promise1((resolve) => resolve(1));
// a.then(() => {
//   console.log(0);
//   return new Promise((resolve, reject) => {
//     console.log(40);
//     // resolve(4);
//     reject(4);
//   })
//     .then((a) => {
//       console.log(a);
//       throw Error('11');
//     })
//     .catch((a) => {
//       console.log(a);
//       return 42;
//     });
// }).then((a) => {
//   console.log(a);
// });

const b = new Promise1((resolve) => resolve(1));
b.then(() => {
  console.log(1);
})
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

console.log(-1);
