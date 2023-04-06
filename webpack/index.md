### webpack

#### 1 entry

入口文件  
单入口写法

```js
module.exports = {
  entry: './path/to/entry/file.js'
};

// 或者

module.exports = {
  entry: {
    main: './path/to/entry/file.js'
  }
};
```

#### 2 output

输出目录  
简单写法，默认输出一个 bundle.js 文件输出到 dist 目录中

```js
module.exports = {
  output: {
    filename: 'bundle.js'
  }
};
```

多个入口起点

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};
```

#### 3 loader

将其他格式文件转换为 javascript 格式  
简单格式，webpack 识别 css 文件和 ts 文件，需要 css-loader 和 ts-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
};
```

loader 从右到左（从上到下）地取值执行。  
比如，下面的例子，从 sass-loader 开始执行，然后是 css-loader，最后以 style-loader 结束。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
```

#### 4 plugins

功能扩展  
用法：向 plugins 属性中传入一个 new 实例

```js
module.exports = {
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```
