### 如何理解 nodejs

nodejs 是一个服务器端的、非阻塞 io 的、事件驱动的 js 运行环境。  
1、非阻塞异步 i/o：nodejs 在进行 I/O 的时候不会造成堵塞，当完成后，会以事件的方式通知执行操作。  
2、事件驱动：  
3、单线程

优点：处理高并发场景性能好，适合 I/O 密集型应用  
缺点：不适合 CPU 密集型，只支持单核 CPU，不能充分利用 CPU

### 关于 process

process.env：环境变量，例如通过 process.env.NODE_ENV 获取不同环境项目配置信息  
process.nextTick: 下一次微任务尽可能快的执行  
process.argv: 获取终端命令参数，返回值是数组，0：node 路径；1、执行 js 文件路径；2-n：参数

### 关于 fs
