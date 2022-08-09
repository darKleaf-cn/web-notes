Array.prototype.reduce1 = function (callback, initValue) {
  if (typeof callback !== 'function') {
    throw Error('');
  }
  const array = this;
  let result = initValue !== undefined ? initValue : array[0];
  for (let i = 0; i < array.length; i++) {
    if (initValue === undefined && i === 0) {
      continue;
    }
    result = callback(result, array[i], i, array);
  }
  return result;
};

// test
const a = [1, 2, 3];
const b = a.reduce1(function (a, b) {
  console.log(a, b);
  return a + b;
});
console.log(b);
