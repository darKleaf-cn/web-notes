### reduce

#### 参数

array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
total	必需。初始值, 或者计算结束后的返回值。
currentValue	必需。当前元素
currentIndex	可选。当前元素的索引
arr	可选。当前元素所属的数组对象。

#### 例子

```js

const a = [1,2,3];
a.reduce(function(a, b){
	return a + b;
}, 0)

```

#### js实现

[代码](./%E4%BB%A3%E7%A0%81/reduce.js)

### new

#### 描述

1、创建一个新对象
2、这个新对象进行原型连接
3、this指向当前对象
4、如果函数没有返回新对象，则返回该对象

#### js实现

[代码](./代码/new.js)