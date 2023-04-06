// 响应式原理

function defineReactive(obj, key, val) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  const getter = property && property.get;
  const setter = property && property.set;

  const childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value;
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val;
      if ((newVal = value)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

// Dep

let uid = 0;
class Dep {
  static target;
  id;
  subs;
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  addSubs(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    const i = this.subs.indexOf(sub);
    if (i !== -1) {
      this.subs.splice(i, 1);
    }
  }
  depend() {}
}

Dep.target = null;
const targetStack = [];
export function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

class Watcher {
  vm;
  expOrFn;
  cb;
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    vm._watchers.push(this);
    this.id = uid++;
    this.cb = cb;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.value = this.get();
    this.getter = expOrFn;
  }
}
