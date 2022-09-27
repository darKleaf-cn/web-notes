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
