## vue 源码

### 响应式原理

首先将 data 中的属性变成可观察的,初始化页面时触发 getter 进行依赖收集，数据改变时触发 setter，进行视图更新

```js

function observe(value, cb) {
	Objects.keys(value).forEach(key => defineReactive(value, key, value[key], cb))
}

function defineReactive(obj, key, value, cb) {
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get(){
			// 依赖收集
			return value;
		}，
		set(newValue){
			value = newValue;
			cb();
		}
	})
}

```

### 代理

将 vue.\_data、vue.\_props 的属性代理到 vue，可以直接通过 vue 访问

```js
for (let key of Object.keys(vue._data)) {
  proxy(obj, '_data', key);
}
function proxy(obj, sourceKey, key) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return obj[sourceKey][key];
    },
    set(newValue) {
      obj[sourceKey][key] = newValue;
    }
  });
}
```

### 响应式原理加上依赖收集

在上面响应式原理的同时进行依赖收集，通过 get 触发依赖收集，set 只对依赖收集的进行响应

```js
function defineReactive(obj, key, value) {
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
```

#### Dep

```js
let uid = 0;
class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

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
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;
const targetStack = [];
function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
```
