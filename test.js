// 创建对象
// 1 工厂模式
function createPerson(name, age, job) {
  const obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.job = job;
  return obj;
}
// 2 构造函数模式
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {};
}
const person1 = new Person();

// 3 原型模式
function Person() {}
Person.prototype.say = function () {};
// 4 组合使用构造函数和原型模式
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {};

// 继承

// 1 原型链继承
function a() {}
function b() {}
b.prototype = new a();
b.prototype.constructor = b;

// 1、实例共享引用类型，修改一个实例的引用类型属性，会影响其他的实例；2、不能向父类构造函数传递参数

// 2 借用构造函数
function a(name) {
  this.name = name;
}
function b(name) {
  a.call(this, name);
}

// 解决了原型链问题，但是无法复用函数方法；

// 3 组合继承
function a(name) {
  this.name = name;
}
function b(name) {
  a.call(this, name);
}
b.prototype = new a();
b.prototype.contructor = b;

// 调用了两次超类构造函数

// 4 寄生式组合继承
function initPrototype(child, parent) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
function a(name) {
  this.name;
}

function b(name) {
  a.call(this, name);
}
initPrototype(b, a);
