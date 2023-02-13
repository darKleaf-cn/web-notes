/**
 * jsonp原理
 * script中的src标签不受跨域影响
 * 例如<script type="" src="http://1.js？callback=jsonp">
 * 前端定义好callback函数的名称，放在请求callback字段中，
 * 后端收到后，返回一段字符串
 * 前端会将其当做js执行
 * 只能是get请求
 */
function qiandaun() {
  function cb(a, b) {}
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.src = 'http://sdsds?callback=cb';
  document.body.appendChild(script);
}

function houduan() {
  http.createServer((req, res) => {
    //解析出callback为cb；
    res.end(`$cb(a, b)`);
  });
}

/**
 * cors原理
 */




/**
 * 什么时候会跨域
 */