### 生命周期

beforeCreate  
created  
beforeMount  
mounted  
beforeUpdate  
updated  
beforeDestroy  
destroyed

### v-if 和 v-for 不建议一起使用

1、不建议一起使用，会带来性能方面的浪费，因为 v-for 优先级比 v-if 高，所有每次渲染都是先循环再判断  
2、如果需要一起使用，外层使用 v-if 的话，外层套一层 template 进行 v-if；内层判断的话，对需要遍历的变量先进行过滤

### 为什么 data 属性是一个函数而不是一个对象

1、根实例对象 data 可以是对象也可以是函数，不会产生数据污染  
2、组件实例对象 data 必须是函数，目的是防止多个组件实例对象之间公用一个 data，产生数据污染。采用函数的形式，每次初始化都会返回新的 data 对象

### spa 首屏加载速度慢怎么办

加载慢的原因

- 网络延时问题
- 资源文件体积是否过大
- 资源是否重复发送请求加载
- 加载脚本时，渲染内容堵塞

解决方案

- 减小入口文件体积：常用方案是路由懒加载，在配置 vue-router 的时候，采用动态加载路由的形式

```js
routes: [
	path: '',
	name: '',
	component: () => import('./a.vue')
]
```

- 静态资源本地缓存： 后端返回资源采用 http 缓存，前端合理使用 localStorage
- UI 框架按需加载：日常使用 element-UI 等框架时，我们经常性直接引用整个 UI 库

```js
import ElementUI from 'element-ui';
Vue.use(ElementUI);
```

实际使用时我们只会用到部分组件，可以进行按需引入

```javascript
import { Button, Input } from 'element';
Vue.use(Button);
Vue.use(Input);
```

- 组件重复打包：
- 图片资源压缩

### vue 中给对象添加新属性界面不刷新

```js
const app = new Vue({
  data: () => {
    item: {
      old: 1;
    }
  },
  methods: {
    a() {
      this.item.new = 2;
    }
  }
});
```

因为新添加的 new 属性并没有进行响应式处理，所以不会刷新页面，可以采用 vue.set(this.item, 'new', 2)对新添加的属性进行响应式处理

### vue 组件间通信

1、父组件传递子组件，通过 props 传递

```
// 父组件
<children name="jack" age="18"/>

// 子组件
props: {
	name: String,
	age: {
		type: Number,
		default: 18,
		require: true
	}
}
```

2、子组件传递父组件，通过$enit 传递

```
// 父组件
<children @add='cartAdd'/>

// 子组件
this.$emit('add', good)
```

3、兄弟组件传值，创建事件总线 eventBus，通过$emit、$on 传递

```js
// eventBus.js
import Vue from 'vue';
export default new Vue();
// 组件1
import eventBus from 'eventBus.js';
eventBus.$emit('add');

// 组件2
import eventBus from 'eventBus.js';
eventBus.$on('add', add);
```

4、频繁跨组件传递，使用 vuex

### vue 双向绑定的原理

1、vue2 通过 Object.defineProperty 进行数据劫持  
2、首次渲染时，触发 get 进行数据依赖  
3、为 input 添加监听事件，修改值会触发 set，set 通知对应的依赖 dep，触发 update()

### $nextTick 为什么是微任务

1、因为同一属性可能会多次改变，如果直接执行的话会触发多次渲染，而放到微任务中只会触发最后一次改变的值

### 关于 mixin

1、局部混入

```js
const myMixin = {
  created: function () {},
  methods: {
    hello: function () {}
  }
};

Vue.component('componentA', {
  mixins: [myMixin]
});
```

2、全局混入

```js
Vue.mixin({
	created: function(){}
})
```

不建议使用全局混入  
当组件存在与mixin对象相同的选项的时候，会覆盖mixin的选项，如果相同选项为声明周期钩子的时候，会合并成一个数组，先执行mixin的钩子，再执行组件的钩子  


### 关于插槽slot

1、默认插槽：子组件使用slot标签确定位置，当父组件使用的时候没有往插槽传入内容时，子组件标签内会显示；当父组件使用的时候，直接在子组件的标签内写入内容

```
// 子组件
<template>
	<slot>
		<p>插槽内容</p>
	</slot>
</template>

// 父组件
<Child>
	<div>默认插槽</div>
</Child>
```

2、具名插槽：子组件用name属性表示插槽的名字，默认为默认插槽，父组件在使用时在默认插槽的基础上加上slot属性，值为子组件插槽name属性值

```
// 子组件
<template>
	<slot>默认插槽内容</slot>
	<slot name='content'></slot>
</template>

// 父组件
<Child>
	<template v-slot:default>对应默认插槽</tempalte>
	<template v-slot:content>对应content插槽</tempalte>
</Child>
```

3、作用域插槽：子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件v-slot接受的对象上

```
// 子组件
<template>
	<slot testProps='aa'></slot>
</template>

// 父组件
<Child>
	<template v-slot:default = 'slotProps'>{{slotProps.testProps}}</tempalte>
	<template #default="slotProps">{{slotProps.testProps}}</tempalte>
</Child>
```

### key的原理

一般在使用v-for等同级元素的时候，要添加key  
因为当进行diff操作的时候，会将tag相同、key相同的判断为同一个节点  
为每个节点添加key可以方便节点复用，减少dom更新操作  
如果没有添加key，key默认为undefined，对列表进行增删操作时，后续元素会误判为同一节点，从而进行多余更新操作  
如果key添加为index，对列表进行增删操作时，后续元素的index也会发生变化，导致进行多余更新操作  

### keep-alive

### 修饰符

1、表单修饰符

```
<input v-model.lazy="value"></input> 当光标离开标签时，才会赋值给value，即在change事件后进行信息同步  
<input v-model.trim="value"></input> 自动过滤用户输入的首空格字符 
<input v-model.number="value"></input> 自动将用户输入的值转化为数值类型  
```
2、事件修饰符

```
<div @click.stop=""></div>  阻止事件冒泡，相当于调用event.stopPropagation 
<div @click.prevent=""></div>  阻止事件默认行为，相当于调用event.preventDefault
<div @click.once=""></div> 调用一次
```

### 封装axios

```js
import axios from 'axios';

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-type'] = 'application/x-www=form-urlencoded';
axios.defaults.baseURL = process.env.VUE_APP.URL;

axios.interceptors.request.use(
	config => {
		config.headers.Authorization = token;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	error => {
		return Promise.reject(error);
	}
)

export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, { params: params }).then((res) => {
			resolve(res.data);
		}).catch((error) => {
			reject(error)
		})
	})
}

export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params).then((res) => {
			resolve(res.data);
		}).catch((error) => {
			reject(error);
		})
	})
}
```

### axios的原理:XMLHttpRequest

```js
xhr.send(data);
new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.setRequestHeader('', '');
	xhr.load = function(){
		resolve(xhr.responseText)
	}
	xhr.send(data);
})
```

