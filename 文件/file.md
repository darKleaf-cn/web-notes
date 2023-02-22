### file

#### 前端获取本地文件

对 input 绑定 onchange 事件  
点击 input 并选择文件后，触发 onchange 事件

```js
input.onchange = function (e) {
  console.log(e.target.files);
};
```

files 是一个 FileList 对象，是一个类数组的对象，每一个文件是一个 File 对象

#### File

File 对象是一个特殊的 blob 对象

#### FileReader 读取 File 对象

1. const reader = new FileReader()
2. reader.onload = function(){this.result}
3. reader.readAsText(File)

读取图片转化为 base64 -- reader.readAsDataURL(File)  
读取二进制 -- readAsArrayBuffer readAsBinaerString

reader.abort() -- 终止操作  
reader.onabort -- 监听中止操作  
reader.onerror -- 监听错误

#### FormData

```js
const formaData = new FormData();
formData.append('filw', File);
ajax.send(formData)
```