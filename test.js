function a(name) {
	this.name = name;
}
a.prototype.sayA = function(){};
function b(name, age) {
	a.call(this,name);
	this.age = age;
}
// b.prototype = new a();
b.prototype = Object.create(a.prototype);
b.prototype.constructor = b;
b.prototype.sayB = function(){};
const c = new b();
console.log(b.prototype, b.prototype.__proto__, a.prototype)