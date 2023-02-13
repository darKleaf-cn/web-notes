### vuex

#### 使用方式

```js
vue.use(vuex);

new Vue({
  el: '#app',
  store
});
```

vuex 暴露出 install 方法，从而注入到 vue 实例中  
install 会通过 vue.mixin 注入到 beforeCreate 生命周期中

```js

Vue.mixin({beforeCreate: vueInit});

function vueInit() {
  const options = this.$options;
  if (options.store) {
    this.$store = typeof options.store = 'function' ? options.store() : options.store;
  } else (options.parent && options.parent.$store){
    this.$store = options.parent.$store;
  }
}

```

#### store实例

[相关代码](./store.js)

#### commit

通过commit（mutation）修改state数据的回收，会在调用mutation方法之前将committing置为true，接下来再通过mutation修改state中的数据，这时候触发$watch的回调断言committing是不会抛出异常的。

#### dispatch

