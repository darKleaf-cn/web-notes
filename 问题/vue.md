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

#### 9、vue2 和 vue3 的 diff 算法分别说一下

简单来说，diff 算法有以下过程

1. 同级比较，再比较子节点
2. 先判断一方有子节点一方没有子节点的情况（如果新的 children 没有子节点，将旧的子节点移除）
3. 比较都有子节点的情况（核心 diff）
4. 递归比较子节点

正常 diff 两个数的时间复杂度是 O(n3)，但实际情况下我们很少会进行跨层级的移动 dom，所以 vue 将 diff 进行了优化，从 O(n3)优化到了 O(n)，只有新旧 children 都为多个子节点时才需要用核心的 diff 算法进行同级比较

1. vue2 的核心 diff 算法采用了双端比较的算法  
   同时从新旧 children 的两端开始进行比较，借助 key 值找到可复用的节点，再进行相关操作。相比 React 的 diff 算法，同样情况下爱可以减少移动节点次数，减少不必要的性能损耗，更加的优雅
2. vue3 借鉴了 ivi 算法和 inferno 算法  
   在创建 vnode 时就确定其类型，以及在 mount、pathc 的过程中采用位运算来判断 vnode 的类型，在这个基础上再配合和兴的 diff 算法，使得性能上较 vue2 有了提升。该算法中还运用了动态规划的思想求解最长递归子序列

#### 10、vue 组件的参数传递

可以从以下方面展开回答：

1. 解释一下父组件和子组件传值实现过程
2. 非父子组件的数据传递，兄弟组件传值是如何实现的

##### 10.1 解释一下父组件与子组件传值实现过程

1. 父组件传给子组件：子组件通过 props 方法接受数据
2. 子组件传给父组件：使用自定义事件，子组件通过$emit 方法触发父组件的方法来传递参数

##### 10.2 非父子组件的数据传递，兄弟组件传值是如何实现的

eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接受事件。项目比较小时，用这个比较合适。  
vuex

#### 11、vue 的路由实现

##### 11.1 解释 hash 模式和 history 模式的实现原理

后面 hash 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面；通过监听 hashchange 事件可以知道 hash 发生了哪些变化，然后根据 hash 变化来实现更新页面部分内容的操作。  
history 模式的实现，主要是 html5 标准发布的两个 api，pushState 和 replaceState，这两个 api 可以在改变 url，但是不会发送请求。这样就可以监听 url 变化来实现更新页面部分内容的操作。  
两种模式的区别：

1. 首先是在 url 的展示上，hash 模式有#，history 模式没有
2. 刷新页面时，hash 模式可以正常加载到 hash 值对应的页面，而 history 没有处理的话，会返回 404，一般需要后端将所有页面都配置重定向到首页路由
3. 在兼容性上，hash 可以支持低版本浏览器和 ie

##### 11.2 router 与 route 的区别

$route 对象表示当前的路由信息，包含了当前 url 解析得到的信息。包含当前的路径，参数，query 对象等

1. $route.params：一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象
2. $route.query：一个 key/value 对象，表示 url 查询参数。例如对于路径 foo?user=1，则有 route.query.user === 1,如果没有查询参数，则是个空对象
3. $route.hash：当前路由的 hash 值，不带#，如果没有 hash 值，则为空字符串
4. $route.fullPath：完成解析后的 url，包含查询参数与 hash 的完整路径
5. $route.matched：数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象
6. $route.name：当前路径名字
7. $route.meta：路由元信息

$router对象是全局路由的实例，是router构造方法的实例。  
$router 对象常用的方法有：

1. push：向 history 栈添加一个新的记录
2. go：页面路由跳转前进后者后退
3. replace：替换当前的页面，不会向 history 栈添加一个新的记录

##### 11.3 vueRouter 有哪几种导航守卫

1. 全局前置钩子：beforeEach、beforeResolve、afterEach
2. 路由独享的守卫：beforeEnter
3. 组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

##### 11.4 解释一下 vueRouter 的完整的导航解析流程是什么

一次完整的导航解析流程如下：

1. 导航被触发
2. 在失活的组件里调用 beforeRouteLeave 守卫
3. 调用全局的 beforeEach 守卫
4. 在重用的组件里调用 beforeRouteUpdate 守卫
5. 在路由配置里调用 beforeEnter
6. 解析异步路由组件
7. 在被激活的组件里嗲用 beforeRouteEnter
8. 调用全局的 beforeResolve 守卫
9. 导航被确认
10. 调用全局的 afterEach 钩子
11. 触发 dom 更新
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

#### 12、vuex 是什么？怎么使用它？什么场景下我们会使用到 vuex

##### 12.1 vuex 是什么

vuex 是一个专为 vue 应用程序开发的状态管理器，采用集中式存储管理应用的所有组件的状态。每一个 vuex 应用的核心就是 store 仓库。store 基本上就是一个容器，它包含着应用中大部分的状态 state。

##### 12.2 为什么需要 vuex

由于组件只维护自身的状态（data），组件创建时或者路由切换时，组件会被初始化，从而导致 data 也随之销毁

##### 12.3 使用方法

在 mainjs 中引入 store，注入。只用来读取的状态集中放在 store 中，改变状态的方式是提交 mutations，这是个同步的事物，异步逻辑应该封装在 action 中。

##### 12.4 什么场景下会使用到 vuex

如果是 vue 的小型应用，那么没有必要使用 vuex，这个时候使用 vuex 反而会带来负担。组件之间的状态传递使用 props、自定义事件来传递即可。  
但是如果涉及到 vue 的大型应用。那么需要类似于 vuex 这样的集中状态管理的状态机来管理所有组件的状态。例如登录状态、加入购物车、音乐播放等，总之只要是开发 vue 的大型应用，都推荐使用 vuex 来管理所有组件状态。

#### 13、keep-alive 相关

1. keep-alive 的实现原理是什么
2. 与 keep-alive 相关的声明周期函数是什么，什么场景下回进行使用
3. keep-alive 的常用属性有哪些

##### 13.1

keep-alive 组件是 vue 的内置组件，用于缓存内部组件实例。这样做的目的在于，keep-alive 内部的组件切回时，不用重新创建组件实例，而直接使用缓存中的实例，一方面能够避免创建组件带来的开销，另一方面可以保留组件的状态。

##### 13.2

keep-alive 具有 include 和 exclude 属性，通过他们可以控制哪些组件进入缓存。另外它还提供了 max 属性，通过它可以设置最大缓存数，当缓存的实例超过该数时，vue 会移除最久没有使用的组件缓存。  
受 keep-alive 的影响，其内部所有嵌套的组件都具有两个声明周期钩子函数，分别是 activeted 和 deactivated，它们分别在组件激活和失活时触发。第一次 activated 触发是在 mounted 之后  
在具体的实现中，keep-alive 在内部维护了一个 key 数组和一个缓存对象

```js
created() {
  this.cache = Object.create(null);
  this.keys = [];
}
```

key 数组记录目前缓存的组件 key 值，如果组件没有指定 key 值，则会为其自动生成一个唯一的 key 值。  
cache 对象以 key 值为键，vnode 为值，用于缓存组件对应的虚拟 dom  
在 keep-alive 的渲染函数中，其基本逻辑是判断当前渲染的 vnode 是否有对应的缓存，如果有，从缓存中读取到对应的组件实例；如果没有则将其缓存  
当缓存数量超过 max 数值时，keep-alive 会移除掉 key 数组的第一个元素。

#### 14、nextTick 的作用是什么？他的实现原理是什么？

vue 更新 dom 是异步更新的，数据变化，dom 的更新并不会马上完成，nextTick 的回调是在下次 dom 更新循环结束之后执行的延迟回调。  
实现原理：nextTick 主要使用了宏任务和微任务。根据执行环境分别尝试采用

1. Promise：可以将函数延迟到当前函数调用栈最末端
2. MutationObserver：是 H5 新加的一个功能，其功能是监听 dom 节点的变动，在所有的 dom 变动完成后，执行回调函数
3. setImmediate：用于中断长时间运行的操作，并在浏览器完成其他操作（如事件和显示更新）后立即运行回调函数
4. 如果以上都不行则采用 setTimeout 把函数延迟到 dom 更新之后再使用，原因是宏任务消耗大于微任务，优先使用微任务，最后使用消耗最大的宏任务。

#### 15、说一下 vue ssr 的实现原理

1. app.js 作为客户端与服务端的公用入口，导出 vue 根实例，供客户端 entry 与服务端 entry 使用。客户端 entry 主要作用挂载到 dom 上，服务端 entry 除了创建和返回实例，还需要进行路由匹配与数据预获取。
2. webpack 为客户端打包一个 clientBundle，为服务端打包一个 ServerBundle。
3. 服务器接受请求时，会根据 url，记载相应组件，获取和解析异步数据，创建一个读取 server bundle 的 bundleRenderer，然后生成 html 发送给客户端。
4. 客户端混合，客户端收到从服务端传来的 dom 与自己的生成的 dom 进行对比，把不相同的 dom 激活，使其可以能够响应后续变化，这个过程称为客户端激活，也就是转换为单页面应用。为确保混合成功，客户端与服务器端需要共享同一套数据。在服务端，可以在渲染之前获取数据，填充到 store 里，这样，在客户端挂载到 dom 之前，可以直接从 store 取数据。首屏的动态数据通过 window.INITIAL_STATE 发送到客户端
5. vuessr 的原理，就是通过 vue-server-renderer 把 vue 的组件输出成一个完整 html，输出到客户端，到达客户端后重新展开为一个单页面应用。

#### 16、vue 组件的 data 为什么必须是函数

组建中的 data 写成一个函数，数据以函数返回值形式定义。这样没复用一次组件，就会返回一份新的 data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全部都变的结果。

#### 17、说一下 vue 的 computed 的实现原理

当组件实例触发生命周期 beforeCreate 后，它会做一系列事情，其中就包括对 computed 的处理。  
它会遍历 computed 配置中的所有属性，为每一个属性创建一个 watcher 对象，并传入一个函数，该函数的本质其实就是 computed 配置中的 getter，这样一来，getter 运行过程中就会收集依赖。  
但是和渲染函数不同，为计算属性创建的 watcher 不会立即执行，因为要考虑到该计算属性是否会被渲染函数使用，如果没有使用，就不会立即执行。因此，在创建 watcher 的时候，它使用了 lazy 配置，lazy 配置可以让 watcher 不会立即执行。  
收到 lazy 的影响，watcher 内部会保存两个关键属性来实现缓存，一个是 value，一个是 dirty

1. vlaue 属性用来保存 watcher 运行的结果，受 lazy 的影响，该值在最开始是 undefined
2. dirty 属性用来指示当前的 value 是否已经过时了，即是否为脏值，受 lazy 的影响，该值在最开始是 true

watcher 创建好后，vue 会使用代理模式，将计算属性挂载到组件实例中，当读取计算属性时，vue 检查其对应的 watcher 是否是脏值，如果是，则运行函数，计算依赖，并得到对应的值，保存在 watcher 的 value 中，然后设置 dirty 为 false，然后返回 watcher 的 value  
巧妙地是，在依赖收集时，被依赖的数据不仅会收集到计算属性的 watcher，还会收集到组件的 watcher  
当计算属性的依赖变化时，会先触发计算属性的 watcher 执行，此时，它只需设置 dirty 为 true 即可，不做处理。  
由于依赖同时会收集到组件的 watcher，因此组件会重新渲染，而重新渲染时又读取到了计算属性，由于计算属性目前为 dirty，因此会重新运行 getter 进行运算。而对于计算属性的 setter，则极其简单，当设置计算属性时，直接运行 setter 即可。

#### 18、vue complier 的实现原理是什么

在使用 vue 的时候，我们有两种方式来创建我们的 html 页面，第一种情况，也是大多情况下，我们会使用模板 template 的方式，因为这更易读易懂也是官方推荐的方法；第二种情况是使用 render 函数来生成 html，它比 template 更接近最终结果。  
complier 的主要作用是解析模板，生成渲染模板的 render，而 render 的作用主要是为了生成 vnode。compllier 主要分为三大块：

1. parse：接受 template 原始模板，接着模板的节点和数据生成对应的 ast
2. optimize：遍历 ast 的每一个节点，标记静态节点，这样就知道哪部分不会变化，于是在页面更新时，通过 diff 减少去对比这部分 dom，提升性能
3. generate 把前两步生成完善的 ast，组成 render 字符串，然后将 render 字符串通过 new Function 的方式转换成渲染函数

#### 19、proxy 相比 defineProperty 的优势在哪里

vue3 改用 proxy 替代 Object.defineProperty  
原因在于 Object.defineProperty 本身存在的一些问题：

1. Object.defineProperty 只能劫持对象属性的 getter 和 setter 方法
2. Object.defineProperty 不支持数组（可以监听数组，不过数组方法无法监听自己重写），更准确的不支持数组的各种 API

而相比 Object.defineProperty，Proxy 的优点在于：

1. Proxy 是直接代理劫持整个对象
2. Proxy 可以直接监听对象和数组的变化，并且有多达 13 中拦截方法

#### 20、watch 与 computed 的区别是什么？以及他们的使用场景分别是什么？

区别：

1. 都是观察数据变化的
2. 计算阿属性会混入到 vue 的实例中，所以需要监听自定义变量；watch 监听 data、props 里面数据的变化
3. computed 有缓存，它依赖的值变了才会重新计算，watch 没有
4. watch 支持异步，computed 不支持
5. watch 是一对多（监听某一个值变化，执行对应操作）；computed 是多对一（监听属性依赖于其他属性）
6. watch 监听函数接受两个参数，第一个是最新值，第二个是输入之前的值
7. computed 属性是函数时，都有 get 和 set 方法，默认是 get 方法，get 必须有返回值

watch 的参数：

1. deep：深度监听
2. immediate：组件加载立即触发回调函数执行

computed 缓存原理：  
computed 本质是一个惰性的观察者；当计算数据存在于 data 或者 props 里时会被警告；  
vue 初次运行会对 computed 属性做初始化处理，初始化的时候会对每一个 computed 属性用 watcher 包装起来，这里面会生成一个 dirty 属性值为 true；然后执行 defineComputed 函数来计算，计算之后会将 dirty 值变为 false，这里会根据 dirty 值来判断是否需要重新计算；如果属性依赖的数据发生变化，computed 的 watcher 会把 dirty 变为 true，这样就会重新计算 computed 属性的值。

#### 21、scoped 是如何实现样式穿透的

首先说一下什么场景下需要 scoped 样式穿透？  
在很多项目中，会出现这么一种情况，即：引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除 scoped 属性造成组件之间的样式污染。此时只能通过特殊的方式，穿透 scoped。  
有三种常用的方法来实现样式穿透  
方法一：使用::v-deep 操作符

```js
<style lang="scss" scoped>
.a{
 ::v-deep .b {
  /* ... */
 }
}
</style>
```

方法二：单独添加一个不包含 scope 的 style

```js
<style>

/* global styles */

</style>



<style scoped>

/* local styles */

</style>

```

方法三：在组件的外层 dom 上添加唯一的 calss 来区分不同组件，在书写样式时就可以正常真毒这部分 dom 书写样式
