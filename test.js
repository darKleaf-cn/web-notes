Array.prototype.reduce1 = function (callback, initValue) {
  const arr = this;
  let result;
  for (let i = 0; i < arr.length; i++) {
    if (initValue === undefined && i === 0) {
      result = arr[0];
    } else {
      result = callback(result, arr[i], i, arr);
    }
  }
	return result;
};
