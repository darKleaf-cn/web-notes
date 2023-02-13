### nginx

#### listen

```conf
http {
    server {
        listen 127.0.0.1:8000;           # 监听127.0.0.1的8000端口
        listen 127.0.0.1;                    # 监听127.0.0.1的默认80端口（root权限）
        listen 8000;                          # 监听本机所有IP的8000端口
        listen *:8000;                        # 监听本机所有IP的8000端口
        listen localhost:8000;           # 监听locahost的8000端口
        listen [::]:8000;                      # 监听IPv6的8000端口
        listen [::1];                             # 监听IPv6的回环IP的默认80端口(root权限)
        listen unix:/var/run/nginx.sock; # 监听域套接字文件

        listen *:8000 \                     # 监听本机的8000端口
                default_server \          # 当前服务是http指令域的主服务
                fastopen=30 \            # 开启fastopen功能并限定最大队列数为30
                deferred \                   # 拒绝空数据连接
                reuseport \                 # 工作进程共享socket这个监听端口
                backlog=1024 \          # 请求阻塞时挂起队列数是1024个
                so_keepalive=on;        # 当socket为保持连接时，开启状态检测功能
    }
}

```

#### server_name

当 server_name 指令值中有多个主机名时，第一个主机名为首主机名

```conf
http {
    server {
        server_name example.com .example.com;       # 泛域名的使用
        server_name www.example.;                   # 多个后缀域名的使用server_name
        www.example.com ~^www.example.com$;         # 正则表达式匹配
        # 正则匹配变量的场景
        server_name ~^(www\.)?(.+)$;
        location / {
            root /sites/$2;
        }

        # 正则匹配为变量的场景
        server_name ~^(www\.)?(?<domain>.+)$;
        location / {
            root /sites/$domain;
        }
    }
}
```

#### location 路由匹配规则

```

不能是正则
location /images

linux 区分大小写，windows 不区分
location = /images

必须匹配正则，linux 区分大小写，windows 不区分
location ~ /images/.*\.(gif|jpg|png)$

必须匹配正则，不区分大小写
location ~* \.(gif|jpg|png)$

匹配项的内容如果不是正则表达式，则不再进行正则测试
location ^~ /images

定义一个只能内部访问的 location，可以被其他内部跳转指令使用，如 try_files 或 error_page
location @images

```

##### location 匹配顺序

1、先检测非正则，再检测正则  
2、正则和非正则都匹配，选择正则  
3、均为非正则匹配，选择匹配内容多的  
4、均为正则，按照书写顺序，匹配后就执行，不做后续检测

#### root

root 设置的是 location 匹配路径的上一层目录，样例中被请求文件的实际本地路径为/data/web/flv/  
即 locahost:80/flv/1 等于 /data/web/flv/1  
root 会替代 path 前面的域名和端口  
location 中的路径是否带/，对本地路径的访问无任何影响

```conf
location /flv/ {
  root /data/web
}
```

#### alias

alias 设置的是 location 匹配路径的上一层目录加上匹配路径 ，样例中实际本地路径那位/data/web  
即 locahost:80/flv/1 等于 /data/web/1  
alias 会替代域名端口加 path

```conf
location /flv/ {
  root /data/web
}
```

```conf
location /img/ {
    alias  assets/;
    autoindex on; #可以访问目录
}
```

#### 代理

见nginx.conf