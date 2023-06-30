### 一、vue3 和 vue3 区别

#### 1、生命周期

vue3 将 beforeCreate 和 created 整合到了 setup 中，将 beforeDestroy 和 destroyed 改名为 onBeforeUnmount 和 onUnmounted

#### 2、多根节点

vue2 组件根节点必须是一个，vue3 可以多根节点

#### 3、Composition API

vue2 选项式 api，代码根据（data、prps、method、computed）等分布，对于无状态组件采用 mixin。  
vue3 组合式 API，代码根据业务逻辑分布，对于无状态组件支持良好。

#### 4、响应式原理

vue2 的响应式原理基础是 Object.defineProperty，vue3 响应式原理基础是 Proxy  
vue3 修改原因：无法监听对象或数组新增、删除的元素  
vue2 相应解决方案：提供 vue.set 监听对象或数组新增属性

#### 5、虚拟 dom

vue3 相比于 vue2，虚拟 dom 上增加 patchFlag 字段  
字段类型情况：1 代表节点为动态文本节点，那在 diff 过程中，只需对比文本内容，无需关注 class、style 等。除此之外，发现所有的静态节点，都保存为一个变量进行静态提升，可在重新渲染时直接引用，无需重新创建。

```js
// patchFlags 字段类型列举
export const enum PatchFlags {
  TEXT = 1,   // 动态文本内容
  CLASS = 1 << 1,   // 动态类名
  STYLE = 1 << 2,   // 动态样式
  PROPS = 1 << 3,   // 动态属性，不包含类名和样式
  FULL_PROPS = 1 << 4,   // 具有动态 key 属性，当 key 改变，需要进行完整的 diff 比较
  HYDRATE_EVENTS = 1 << 5,   // 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6,   // 不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7,   // 带有 key 属性的 fragment 或部分子节点
  UNKEYED_FRAGMENT = 1 << 8,   // 子节点没有 key 的fragment
  NEED_PATCH = 1 << 9,   // 只会进行非 props 的比较
  DYNAMIC_SLOTS = 1 << 10,   // 动态的插槽
  HOISTED = -1,   // 静态节点，diff阶段忽略其子节点
  BAIL = -2   // 代表 diff 应该结束
}
```

#### 6、diff 算法优化

vue2 和 vue3 都是分层比较 vue3 添加了 PatchFlag 字段，在生成 vnode 的时候，同时打上标记，对于不参与更新的元素，做静态标记并提示，只会被创建一次，在渲染时直接复用。

具体 diff 步骤：

1. 从首部比较，遇到不同的节点退出
2. 从尾部比较，遇到不同的节点退出
3. 遍历过程中满足 i > e1 && i < e2，说明仅有节点新增
4. 遍历过程中满足 i < e1 && i > e2，说明仅有节点移除
5. 剩下的节点为不确定的元素，首先遍历所有的新节点，将 key 和索引保存到 map 中
6. 接下来遍历旧节点，找到和 map 中对应的节点进行移动等操作
