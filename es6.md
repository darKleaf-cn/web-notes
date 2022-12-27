### var 和 let 和 const 的区别

1、var 是函数作用域，let 和 const 是块作用域； 2、var 会声明提前，let 和 const 不会声明提前，而且具有暂时性死区； 3、var 允许重复声明，let 和 const 不允许重复声明； 4、全局作用中，var 可以通过 window 访问，let 和 const 不会。

### es6 新增

#### 关于数组

关于数组 1、扩展运算符...  
2、Array.from()，将类似数组的对象和可迭代的对象（Set、Map）  
3、Array.of()，将一组值转化为数组， 没参数，返回空数组  
4、entries()，keys()，values()

```js
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
```
#### 关于对象

1、扩展运算符...
2、解构性赋值


#### 关于函数

