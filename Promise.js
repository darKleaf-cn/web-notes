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
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    try {
      func(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    const realOnRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new Promise1((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = realOnFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = realOnRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              const x = realOnFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = realOnRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });
    return promise2;
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  all(iterators) {
    const arr = Array.from(iterators);
    const len = arr.length;
    const result = [];
    let num = 0;
    return new Promise1((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Promise1) {
          arr[i]
            .then((value) => {
              num++;
              result[i] = value;
              if (num === len) {
                resolve(result);
              }
            })
            .catch((e) => {
              reject(e);
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
  race(iterators) {
    const arr = Array.from(iterators);
    return new Promise1((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Promise1) {
          arr[i]
            .then((value) => {
              resolve(value);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          resolve(arr[i]);
        }
      }
    });
  }
  static resolve(value) {
    return new Promise1((resolve) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new Promise1((resolve, reject) => {
      reject(reason);
    });
  }
  finally(cb) {
    return this.then(
      (value) => Promise1.resolve(cb()).then(() => value),
      (reason) =>
        Promise1.reject(cb()).catch(() => {
          throw reason;
        })
    );
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    reject(new Error(''));
  }
  if (x instanceof Promise1) {
    console.log('aa' + x);
    // 获得它的终值 继续resolve
    if (x.status === PENDING) {
      // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
      x.then(
        (y) => {
          resolvePromise(promise2, y, resolve, reject);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else {
      // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
      x.then(resolve, reject);
    }
    // 如果 x 为对象或者函数
  } else if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      resolve(x);
    }
    const then = x.then;
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (err) {
        if (called) return;
        reject(err);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

const a = new Promise1((resolve) => resolve(1));
a.then(() => {
  console.log(0);
  return new Promise1((resolve, reject) => {
    console.log(40);
    resolve(4);
    // reject(4);
  })
    .then((a) => {
      console.log(a);
      // throw Error('11');
    })
    .then((a) => {
      console.log(a);
      return 42;
    })
    .then((a) => {
      console.log(a);
      return 41;
    });
})
  .then((a) => {
    console.log(a);
    throw a;
  })
  .finally(() => {
    console.log(43);
  })
  .catch((a) => {
    console.log(a);
  });
