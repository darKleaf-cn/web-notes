### var和let和const的区别

1、var是函数作用域，let和const是块作用域；
2、var会声明提前，let和const不会声明提前，而且具有暂时性死区；
3、var允许重复声明，let和const不允许重复声明；
4、全局作用中，var可以通过window访问，let和const不会。