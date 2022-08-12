function new1(fn, ...args) {
  const obj = Object.create(fn.prototype);
  // const obj = {};
  // obj.__proto__ = fn.prototype;
  const result = fn.apply(obj, args);
  return result && (typeof result === 'object' || typeof result === 'function') ? result : obj;
}

// test
function A() {
  this.a = 1;
  return undefined;
}
console.log(new1(A), new A());
