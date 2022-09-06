let a = 0;
setInterval(function () {
	a++;
	postMessage(a);
	self.postMessage(a);
}, 1000)
self.onmessage = function (value) {
	console.log(value.data + 'aa');
	console.log(value)
}