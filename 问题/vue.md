#### 1、mvvm 和 vue 的关系（view 和 model 如何交流）

mvc 指的是 model、view、control  
mvvm 指的是 model 模型、view 视图、viewmodel 视图模型  
vue 相当于 mvvm 中的 viewmodel 层，通过数据绑定把模型层的数据转换至视图层中，通过 dom 监听将视图层的数据转换至模型层中

#### 2、对 mvvm 的理解

mvvm 是 model-view-viewmodel 的缩写。model 层代表说数据模型，view 代表视图 ui 层。两者之间通过 viewmodel 层连接，而且是相互的，比如 vue 采用的双向绑定将 view 和 model 连接起来的，而开发者只需要关注业务逻辑，不需要去手动操作 dom。

#### 3、解释一下对 vue 声明周期的理解

##### 什么是 vue 生命周期

对于 vue 来说，生命周期就是一个 vue 实例从创建到销毁的过程

##### vue 生命周期的作用是什么

在生命周期过程中，不同的生命周期函数给给予了开发者在不同生命周期添加业务代码的能力，可以理解为，代码执行到某个地方时，检测是否有对应的钩子，如果有就执行。

##### vue 生命周期几个阶段

它可以分为 8 个阶段：创建前后、载入前后、更新前后、销毁前后

1. beforeCreate：实在 new Vue（）之后触发的第一个钩子，在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。
2. created：在实例创建后完成，当前阶段完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 update 函数。可以做一些初始数据的获取，在当前阶段无法与 dom 进行交互
3. beforeMount：发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 dom 已经创建完成，即将开始渲染。在此时可以对数据进行更改，不会触发 updated。
4. mounted：在挂载完成后发生，在当前阶段，真实的 dom 挂载完毕，数据完成双向绑定，可以访问到 dom 节点，使用$ref 属性对 dom 进行操作
5. beforeUpdate：发生在更新之前，也就是响应式数据发生更新，虚拟 dom 重新渲染之前被触发，你可以再当前阶段进行更改数据，不会造成重渲染。
6. updated：发生在更新完成之后，当前阶段组件 dom 已完成更新。要避免在此期间更改数据，因为这可能会导致无限循环的更新。
7. beforeDestroy：发生在实例销毁之前，在当前阶段实例完成可以被使用，我们介意在这是进行善后收尾工作，比如清除定时器。
8. destroyed：发生在实例销毁之后，这个时候只生下了 dom 空壳。组件已被拆解，数据绑定被拆除，监听被移除，子实例也统统被销毁。

##### dom 渲染在哪个周期完成

dom 渲染是在 mounted 阶段完成，此阶段真实的 dom 挂载完毕，数据完成双向绑定，可以访问到 dom 节点。

##### 多组件（福字组件）中生命周期的调用顺序说一下

组件的调用顺序是先父后子，渲染完成的顺序是先子后父。组件的销毁操作时先父后子，销毁完成的顺序是先子后父。

1. 加载渲染过程：父 beforeMounted-> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
2. 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
3. 父组件更新过程：父 beforeUpdate -> 父 updated
4. 销毁过程：父 beforeDestroy ->子 beforeDestroy -> 子 destroyed -> 父 destroyed

#### 4、vue 实现双向数据绑定原理是什么

vue2 采用数据劫持结合发布发布订阅模式的方式，通过 Object.defineProperty 来劫持各个属性的 setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。当把一个普通 js 对象传给 vue 实例来作为他的 data 选项时，vue 将遍历他的属性，用 Object.defineProperty 将他们转为 getter、setter。用户看不到 getter、setter，但是在内部他们让 vue 追踪依赖，在属性被访问和修改时通知变化。  
vue 的数据双向绑定整合了 Observer，Comple 和 watcher 三者，通过 Observer 来监听自己的 model 的数据变化，通过 compile 来解析编译模板指令，最终利用 watcher 大气 observer 和 compile 之间的通信桥梁，达到数据变化-视图更新，视图交互变化-数据 model 变更的双向绑定效果。  
vue3 放弃了 Object.defineProperty，使用了 es6 原生的 proxy，来解决以前使用 Object.defineProperty 所存在的一些问题

#### 5、说一下 vue2 响应式原理的理解

vue 在初始化数据时，会使用 Object.defineProperty 重新定义 data 中的所有属性，当页面使用对应属性时，首先会进行依赖收集（收集当前组件的 watcher），如果属性发生变化会通知相应依赖进行更新操作（发布订阅）。（参考前面第 4 题答案）

#### 6、说一下在 vue2 中如何检测数组的变化

vue2 中实现检测数组变化的方法，是将数组的常用方法进行了重写。vue 将 data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组 api 时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归进行监控，这样就实现了检测数组变化。  
流程：

1. 初始化传入 data 数据执行 initData
2. 将数据进行观测 new Observer
3. 将数组原型方法指向重写的原型
4. 深度观察数组中的引用类型

有两种情况无法检测到数组的变化

1. 当利用索引直接设置一个数组项时，例如 vm.items[index] = value
2. 当修改数组的长度时，例如 vm.items.length = 2

不过这两种场景都有对应的解决方案

```js
vm.$set(vm.items, index, value);
vm.items.splice(index, 1, value);
```

#### 7、vue3 响应式数据

可以从以下方面展开回答：

1. vue2 响应式数据原理是什么
2. proxy 只会代理对象的第一层，那么 vue3 是怎么处理这个问题的呢
3. 监测数组的时候可能触发多次 set、get，那么如何防止触发多次呢

##### 7.1 vue3 响应式原理是什么

在 vue2 中，响应式原理就是使用的 Object.defineProperty 来实现的。但是在 vue3 中采用了 Proxy，抛弃了 Object.defineProperty 方法。  
究其原因，主要是：

1. Object.defineProperty 无法监控到数组下标的变化，导致通过数组下表添加元素，不能实时响应
2. Object.defineProperty 只能劫持对象的属性，从而需要对每个独享，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy 可以劫持整个对象，并返回一个新的对象。
3. Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
4. Proxy 有多达 13 中拦截方法
5. Proxy 作为新标准收到浏览器厂商终点持续的性能优化

##### 7.2 Proxy 只会代理对象的第一层，那么 vue3 是怎么处理这个问题的呢

判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理，这样就实现了深度检测

##### 监测数组的时候可能触发多次 get、set，那么如何防止触发多次呢

我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值和新值是否相等，只有满足以上两个条件之一，才有可能执行 trigger。

#### 8、v-model 双向绑定的原理是什么

v-model 本质上就是 value+input 方法的语法糖。可以通过 model 属性的 prop 和 wvwnt 属性来进行自定义，原生的 v-model，会根据标签的不同生成不同的事件和属性。  
例如：

1. text 和 textarea 元素使用 value 属性和 input 事件
2. checkbox 和 radio 使用 checked 属性和 change 事件
3. select 字段将 value 作为 prop 并将 change 作为事件

以输入框为例，当用户在输入框输入内容时，会触发 input 事件，从而更新 value。而 value 的改变同样会更新视图，这就是 vue 中的双向绑定。双向绑定的原理，其实现思路如下：  
首先要对数据进行劫持监听，所以我们需要设置一个监听器 observer，用来监听所有属性。如果属性发生变化了，就告诉订阅者 watcher 看是否需要更新。  
因为订阅者有很多歌，所以我们需要有一个消息订阅器 Dep 来专门收集这些订阅者，然后再监听器 observer 和订阅者 watcher 之间进行统一管理。  
接着，我们还需要一个指令解析器 compile，对每个节点元素进行扫描和解析，将相关指令对应初始成一个订阅者 watcher，并替换模板数据或者绑定相关的函数，此时订阅者 watcher 接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。  
因此接下来我们执行以下 3 个步骤，实现数据的双向绑定：

1. 实现一个监听器 observer，用来劫持并监听所有属性，如果有变动的，通知订阅者。
2. 实现一个订阅者 watcher，可以收到属性的变化通知并执行相关的函数，从而更新视图。
3. 实现一个解析器 compile，可以扫描和解析每个节点的相关指令，并根据初始化模板以及初始化相应的订阅器。
