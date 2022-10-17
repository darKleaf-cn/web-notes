import { Dep } from './Dep.js';
// Observer
class Observer {
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
}
function defineReactive(obj, key, val) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  const getter = property && property.get;
  const setter = property && property.set;
  const childOb = observe(val);
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
			if (value === val) {
				return;
			}
			if (setter) {
				setter.call(obj, newVal)
			} else {
				val = newVal;
			}
			childOb = observe(val);
			dep.notify();
		}
  });
}

function observe(vm) {}
function dependArray(value) {}
