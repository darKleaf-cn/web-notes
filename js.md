### 闭包

闭包指有权访问另一个函数作用域中的变量的函数。

### this

判断 this 指向优先级 1、函数是否在 new 中调用，this 绑定 new 创建的对象； 2、函数是否通过 call、apply、bind 绑定，this 指向绑定对象； 3、函数是否在某个上下文对象中调用，this 绑定上下文对象； 4、默认：严格模式绑定到 undefined，否则绑定到全局对象。

### dom 操作

1、查找 dom

```js
document.getElementById('');
document.getElementsByClassName('')[];
document.querySelector('');
document.querySelectorAll('')[];
```

2、修改属性

```js
dom.setAttribute('', '');
dom.getAttribute('');
dom.removeAttribute('');
```

3、设置样式

```js
dom.style.color = 'red';
com.style.background.color = 'red';
```

4、offset

指的是 dom 相对父元素（positon 不是默认）的偏移位置

```js
dom.offertParent; //相对父元素
dom.offsetTop;
dom.offsetLeft;
dom.offsetWidth; // 包含padding、border
dom.offsetHeight;
```

5、scroll

指元素(必须是可以滚动的元素，否则是 scrollTop 是 0)没显示出来的实际高度

```js
dom.scrollTop; // 对象上边界和可视窗口左上角的距离
dom.scrollLeft; // 对象左边界和可视窗口左上角的距离
dom.scrollHeight; // 对象的滚动高度
dom.scrollWidth; // 对象的滚动宽度
```

6、client

指元素

```js
dom.clientLeft; // 对象左边框宽度，即border，不包含padding、margin
dom.clientTop; // 对象上边框宽度，即border，不包含padding、margin
dom.clientWidth; // 对象内部宽度，即content + padding
dom.clientHeight; // 对象内部高度，即content+ padding
```

7、关系

1. 没有竖直方向上的滚动条：scrollHeight = clientHeight，同理水平方向
2. scrollTop + clientHeight <= scrollHeight;
3. 判定是否滑到底是 scrollHeight - scrollTop - clientHeight <= 1(阈值)

### 作用域

1. 全局作用域
2. 函数作用域
3. 块级作用域（es6 之后）
