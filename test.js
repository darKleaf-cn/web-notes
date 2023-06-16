function observe(value, cb) {
  Object.keys(value).forEach((key) => defineReactive(value, key, value[key], cb));
}

// 代理

function _proxy(data) {
  const that = this;
  Object.keys(data).forEach((key) => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get() {
        return that._data[key];
      },
      set(val) {
        that._data[key] = val;
      }
    });
  });
}

// 依赖收集类

class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    const index = this.subs.indexOf(sub);
    this.subs.splice(index, 1);
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}

class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.cb = cb;
    this.vm = vm;
    vm._watchers.push(this);
    Dep.target = this;
    this.get();
  }

  get() {
    pushTarget(this);
    let value;
    const vm = this.vm;
    value = this.cb.call(this.vam, vm);
    if (this.depp) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
    return value;
  }

  cleanupDeps() {}

  update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  }

  run() {
    this.cb.call(this.vm, value, oldValue);
  }

  cleanupDeps() {
    let i = this.cleanupDeps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
  }
}

function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === 'function' ? getData(data, vm) : data || {};
  const keys = Object.keys(data);
  proxy(vm, '_data', keys[i]);
  observe(data);
}

function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get() {
      return target[sourceKey][key];
    },
    set(val) {
      target[sourceKey][key] = val;
    }
  });
}

function observe(value) {
  let ob = value.__ob__ || new Observer(value);
  return ob;
}

class Observer {
  value;
  dep;
  vmCount;
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    if (Array.isArray(value)) {
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
}

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(function (method) {
  const original = arrayProto[method];

  Object.defineProperty(arrayMethods, method, {
    configurable: true,
    value: function (...args) {
      const result = original.apply(this, args);
      const ob = this.__ob__;
      let inserted;
      switch (method) {
        case 'push':
          inserted = args;
          break;
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }
      if (inserted) {
        ob.observeArray(inserted);
      }
      ob.dep.notify();
      return result;
    }
  });
});

function defineReactive(obj, key, val) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  const getter = property && property.get;
  const setter = property && property.set;

  let childOb = observe(val);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
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
    set: function (newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value) {
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
