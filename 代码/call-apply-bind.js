// es6

Function.prototype.call1 = function (context, ...args) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = new Object(context);
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

Function.prototype.apply1 = function (context, args) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = new Object(context);
  }
  const key = Symbol();
  context[key] = this;
  const result = args ? context[key](...args) : context[key]();
  delete context[key];
  return result;
};

Function.prototype.bind1 = function bind1(context, ...args) {
  const that = this;
  function second(...secondArgs) {
    const isNew = this instanceof second;
    context = isNew ? this : new Object(context);
    return that.call(context, ...args, ...secondArgs);
  }
  if (this.prototype) {
    second.prototype = Object.create(that.prototype);
  }
  return second;
};

// es5

Function.prototype.call2 = function () {
  let context = arguments[0];
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = new Object(context);
  }
  context.fn = this;
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  const result = eval('context.fn(' + args + ')');
  delete context.fn;
  return result;
};

Function.prototype.apply2 = function () {
  let context = arguments[0];
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  context.fn = this;
  const args = [];
  if (arguments.length === 2) {
    for (let i = 1; i < arguments[1].length; i++) {
      args.push('arguments[1][' + i + ']');
    }
  }
  const result = eval('context.fn(' + args + ')');
  delete context.fn;
  return result;
};

const a = { a: 1 };
const b = a.toString.apply2(a);
console.log(b);
