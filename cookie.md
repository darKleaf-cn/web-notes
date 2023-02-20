### cookie

#### Set-Cookie

服务器通过在响应头里面添加 Set-Cookie 字段，浏览器收到响应后保存 Cookie，之后对该服务器每一次请求都在请求头中 cookie 字段返回

```
// 服务器
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

// 客户端
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry

```

#### 定义 Cookie 的声明周期

1. 会话期 Cookie：没有设置过期时间时，默认为会话 Cookie，储存在内存中，会在浏览器关闭后删除
2. 持久性 Cookie：在过期时间（Expires）指定的日期或有效期（Max-Age）指定的一段时间后删除

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```

#### 限制访问 Cookie

有两种方法可以确保 Cookie 被安全发送，并且不会被意外的参与者或脚本访问：secure 和 HttpOnly  
标记为 Secure 的 Cookie 只会通过被 https 协议加密过的请求发送给服务端，不会使用不安全的 http 发送  
Document.cookie 不会访问带有 HttpOnly 属性的 Cookie

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

```

#### Domain

Domain 指定了哪些主机可以接受 Cookie，如果不指定，该属性默认为同一 host，不包含子域名；如果指定 Domain，则一般包含子域名

```
Domain=mozilla.org
Cookie包含子域名developer.mozilla.org
```

#### Path

例如，设置 Path=/docs，则一下地址都会匹配：

- /docs
- /docs/
- /docs/web/
- /docs/web/http

但是以下地址不会匹配：

- /
- /docsets
- /fr/docs

#### SameSite

该属性允许服务器是否通过跨站点发送 cookie，有三个值

- Strict：仅发送到它来源的站点
- Lax：和 Strict 类似，只会在用户导航到 cookie 的源站点发送 cookie
- None：会在安全情况下跨站发送 cookie

#### document.cookie

得到通过分号分割的 key-value 格式的字符串

```
_ga=GA1.2.996924373.1639532921; _gid=GA1.2.795393214.1676858430; _gat=1
```

创建新的 cookie：document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"
