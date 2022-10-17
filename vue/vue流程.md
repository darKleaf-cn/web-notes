## vue 初始化流程

1、初始化 data  
2、data 赋值给 vue.\_data  
3、vue.\_data 进行代理，可以直接通过 vue 访问\_data 的属性  
4、执行 observe(vue.\_data)作用就是为该对象添加一个观察者  
5、new 一个 Observer 观察者，并且 vue.\_data.\_\_ob\_\_等于这个观察者，观察者中会 new 一个 Dep（依赖收集）  
6、同时 Observer 会对\_data 中每个对象进行响应式处理  
7、响应式处理的同时进行依赖收集  
