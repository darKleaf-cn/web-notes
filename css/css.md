### 1 px 和 em 的区别

1. px 代表一个像素
2. em 是一个相对长度单位，具体的大小需要相对于父元素 fnot-size 计算，子元素 1em 表示大小和父元素一样，0.5em 表示字体大小是父元素的一般
3. rem 和 em 类似，相对于根元素字体大小计算。

### 2 vw、vh 是什么

vw 和 vh 是 css3 新单位，即 view width 可视窗宽度和 view height 可视窗口高度。1 vw 等于可视窗口宽度的百分之一，1 vh 等于可视窗口高度的百分之一。

### 3 介绍下 bfc 及其作用

所谓 bfc，指的是一个独立的布局环境，bfc 内部的元素布局与外部互不影响

触发 bfc 的方式有很多，常见的有：

1. 设置浮动
2. overflow 设置为 auto、scroll、hidden
3. position 设置为 absolute、fixed

bfc 的效果：

1. 解决浮动元素令父元素高度坍塌的问题
2. 解决非浮动元素被浮动元素覆盖问题
3. 解决外边距垂直方向重合的问题

### 4 space-between 和 space-around 的区别

space-between 是两端对齐，左右两端没有边距；而 space-around 是每个子项目左右方向的 margin 相等，所以两个 item 中间的间距会比较大.

### 5 css 中 transition 和 animation 的属性分别有哪些

transition 过渡动画：

1. transition-property：指定过渡的 css 属性
2. transition-duration：指定过渡所需的完成时间
3. transition-timing-function：指定过度函数
4. transition-delay：指定过渡的延迟时间

animation 关键帧动画：

1. animation-name：指定绑定到选择器的关键真的名称
2. animation-duration：动画指定需要多少秒或毫秒完成

### 6 如何用 css 实现一个三角形

利用 border 属性，将其他方向上的 border-color 都设置为透明即可

```css
div {
  width: 0px;
  height: 0px;
  border: 10px solid red;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}
```

### 7 如何实现一个自适应的正方形

#### 7.1 利用 css3 的 vw 单位

vw 会把视口的宽度评分为 100 份

```css
div {
  width: 10vw;
  height: 10vw;
  background: red;
}
```
#### 7.2 利用margin或者padding的百分比计算是参照父元素的width属性

```css
div {
  width: 10%;
  padding-bottom: 10%;
  height: 0;
  background: red;
}
```

### 8 媒体查询

```css
@media screen and (min-width:1024px) and (max-width: 1440px) {
  
}
```