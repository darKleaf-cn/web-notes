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
const a = [];
const b = a.reduce1(function (a, b) {
  console.log(a, b);
  return a + b;
});
const c = a.reduce(function(){})
console.log(b);


Array.prototype.reduce2 = function(callback, initValue) {
  if (typeof callback !== 'function') {
    throw Error('');
  }
  const array = this;
  if (initValue === undefined && array.length === 0) {
    throw Error('')
  }
  let result = initValue !== undefined ? initValue : array[0];

  for(let i = 0; i < array.length; i++) {
    if (initValue === undefined && i === 0) {
      continue;
    }
    result = callback(result, array[i], i, array);
  }
  return result;
}