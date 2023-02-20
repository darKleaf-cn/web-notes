### file

#### 1

对 input 绑定 onchange 事件  
点击 input 并选择文件后，触发 onchange 事件  

```js
input.onchange = function(e) {
  console.log(e.target.files)
}
```
files是一个FileList对象，是一个类数组的对象，每一个文件是一个File对象  