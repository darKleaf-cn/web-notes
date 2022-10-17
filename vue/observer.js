import Dep from './Dep.js';
import arrayMethods from './array.js';
export class Observer {
  value;
  dep;
  vmCount;
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;

    Object.defineProperty(value, '__ob__', {
      enumerable: true,
      configurable: true,
      value: this
    });

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
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

function observe(value) {
  const ob = new Observer(value);
  return ob;
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
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
      if (newVal === value || (newVal !== newVal && value !== value)) {
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

function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    const e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
