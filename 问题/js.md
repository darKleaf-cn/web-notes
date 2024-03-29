#### 1、怎么判断浏览器的类型，怎么判断是 pc 端还是移动端

window.navigator.userAgent 根据每种浏览器的区别来区分

#### 2、浏览器输入 url 会发生什么

1. 解析 url，符合 url 规则按照 url 处理，不符合则交给默认搜索引擎处理
2. http 缓存：![http缓存](./http%E7%BC%93%E5%AD%98.webp)
3. dns 解析：浏览器缓存 -> 操作系统缓存（hosts 文件） -> 本地域名服务器 -> 迭代查询（根域名服务器返回顶级域名服务器地址，顶级返回权限地址，权限返回 ip 地址）
4. tcp 连接：三次握手
5. 发送 http 请求
6. 服务端响应请求
7. tcp 断开连接：四次挥手
8. 页面渲染：解析 html 为 dom 树，解析 style 为 css 格式树，最后合并为 render 树

#### 3、格式化时间为年月日时分秒

```js
function format() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  return time;
}
```

#### 4、dom 渲染

网络进程接收到响应头后，会根据响应头中的 content-type 判断文件类型，如果是 text/html，会为该请求开启一个渲染进程。  
一旦浏览器接收到数据的第一块，就会开始解析收到的信息。解析是指浏览爱情将通过网络接受的数据转换为 dom 和 cssom 的步骤，通过渲染器把 dom 和 cssom 在屏幕上绘制成页面

1. 处理 hmtl 标记并构造 dom 树（html 解析器）  
   当解析器发现非阻塞资源，例如一张图片，浏览器会请求这些资源并继续解析。当遇到一个 css 文件时，解析也可以继续进行，但是对于 script 标签会阻塞渲染并停止 html 的解析。  
   尽管浏览器的预加载扫描器加速了这个过程，但过多的脚本仍然是一个重要的瓶颈。

ps：预加载扫描器浏览器构建 dom 树时，这个过程占用了主线程。当这种情况发生时，预加载扫描仪将解析可用的内容并请求高优先级资源，如 css、js 和 web 字体。它将在后台检索资源，以便在主 html 解析器到达请求的资源时，它可能已经在运行或者下载。  
为了确保脚本不会阻塞朱进程，当 javascript 解析和执行顺序不重要时，可以添加 async 属性或者 defer 属性  
其中，async 会异步下载，但是下载完会立即执行；defer 一不下载，但是会延后执行，等待 html 渲染完成  
2. 构建 cssom 树  
浏览器会将 css 规则转化为对应的 css 树  
3. 将创建的 cssom 树和 dom 组合成 render 树  
4. 回流和重绘，确定每个节点的位置大小等等样式，进行渲染

#### 5、浏览器的进程和线程

一个 chrome 浏览器包含：1 个浏览器主进程、1 个 GPU 进程、1 个网络进程、多个渲染进程以及多个插件进程  
其中渲染进程包含：

1. GUI 渲染线程
2. js 引擎线程
3. 事件触发线程
4. 计时器触发线程
5. 异步 http 线程

其中 345 线程都是在任务队列做事件循环，12 线程会相互堵塞

#### 6、v8 垃圾回收机制

v8 将堆分为两类：新生代和老生代，新生代存放的是生存时间短的对象，老生代存放的是生存时间久的对象  
新生代通常只支持 1-8M 的容量，而老生代支持的容量比较大。

##### 新生代采用 scavenge 复制算法

scavange 算法将新生代分为两部分，分别为 from-space 和 to-space  
主要流程为：

1. 标记活动对象和非活动对象
2. 复制 from-space 的活动对象到 to-space 并排序
3. 释放 from-space 中非活动对象的内存
4. 将 from-sapce 和 to-space 互换

问：垃圾回收期如何判断活动对象和非活动对象？  
答：从根（window）向下访问子节点，直到遍历结束，可访问到的就是活动对象，访问不到的就是垃圾。

问：新生代的对象如何变为老生代的对象？  
答：新生代的对象经历多次回收依然存在会晋升到老生代，或者 to-sapce 的空间占用超过 25%会把对象立即复制到老生代，而 25%的红线要求是为了保证后续空闲区和使用反转时对于分配空间操作不会被影响。

##### 老生代使用标记清除和标记整理算法

1. 标记清除  
   标记阶段：对老生代进行第一次扫描，标记活动对象  
   清理阶段：对老生代进行第二次扫描，清除未被标记的对象  
   问题是残留很多内存碎片，浪费内存
2. 标记整理  
   在标记清楚基础上增加了标记整理阶段，将所有的活动对象往一端移动，移动完成后，直接清掉边界的内存

##### 优化

为了解决全停顿现象，v8 又加入了并行、增量标记等方法

1. 全停顿：GC 回收时会阻塞 js 脚本的运行导致系统停顿，等 GC 回收结束后恢复正常
2. 并行：开启 GC 回收线程后，会同时开启多个辅助线程进行处理，提高处理时间
3. 增量标记：将一次 GC 标记过程进行拆分，一次执行一小部分，和脚本交替执行，直至这次 GC 标记完成

#### 7、commonjs 和 esm 的区别和循环依赖

语法层面：commonjs 通过 require，esm 通过 import

三大差异

1. commonjs 模块输出的是一个值的拷贝，es6 模块输出的是值的引用
2. commonjs 模块式运行时加载，es6 模块式编译时输出接口
3. commonjs 模块的 require 是同步加载模块，es6 模块的 import 是异步加载，有一个独立的模块依赖的解析阶段

第二个差异是因为 commonjs 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。而 es6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

第一个差异：改变 incCounter 函数，counter 并不会变化

```js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter
};
```

而 es6 模块的运行机制与 commonjs 不一样。js 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
