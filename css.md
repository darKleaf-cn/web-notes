### display:none、visibility:hidden、opacity:0 的区别

1、display：none 触发回流，visibility：hidden 和 opacity：0 触发重绘  
2、display：none 不占位置，visbility：hidden 和 opacity：0 占位置  
3、display：none 和 visibility：hidden 不会触发事件，opacity：0 会触发事件

### css 优先级顺序

!important > 内联样式 > id 选择器 > 类选择器 > 标签选择器 > 通配选择器(\*{}) > 继承

### bfc

bfc 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。  
什么时候会形成 bfc？

1. 根元素：html
2. 浮动元素：float 不为 none
3. 绝对定位元素：position 为 absolute 或者 fixed
4. overflow 不为 visible
5. display 为 table-cell、inline-block
6. flex 和 grid 的直接子元素

三个特性

##### 1 包含内部浮动

清除子元素的浮动

##### 2 排除外部浮动

![](./assets/bfc%E6%8E%92%E9%99%A4%E5%A4%96%E9%83%A8%E6%B5%AE%E5%8A%A8.png)

##### 3 避免外边距重叠

![](./assets/bfc%E5%A4%96%E8%BE%B9%E8%B7%9D%E9%87%8D%E5%8F%A0.png)
