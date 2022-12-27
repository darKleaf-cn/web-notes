### display:none、visibility:hidden、opacity:0 的区别

1、display：none 触发回流，visibility：hidden 和 opacity：0 触发重绘  
2、display：none 不占位置，visbility：hidden 和 opacity：0 占位置  
3、display：none 和 visibility：hidden 不会触发事件，opacity：0 会触发事件

### css优先级顺序

!important > 内联样式 > id选择器 > 类选择器 > 标签选择器 > 通配选择器(*{}) > 继承