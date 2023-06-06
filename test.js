function defineReactive(obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val;
    },
    set(newValue) {
      val = newValue;
      cb();
    }
  });
}

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
    Dep.target = this;
    this.cb.call(this.vm);
  }

  update() {
    this.cb.call(this.vm);
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

  Object.defineProperty(arrayMethods, method, function() {
    
  })
})