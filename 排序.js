// 冒泡排序
function sortMp(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const emp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = emp;
      }
    }
  }
  return arr;
}

// 快速排序

function sortK(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const a = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= a) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return sortK(left).concat(a, sortK(right));
}

// 归并排序

function sortGb(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = sortGb(arr.slice(0, mid));
  const right = sortGb(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  if (left.length) {
    result.push.apply(result, left);
  }
  if (right.length) {
    result.push.apply(result, right);
  }
  return result;
}

// 选择排序
function sortXz(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    const emp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = emp;
  }
  return arr;
}

// 插入排序
function sortCr(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const result = sortD([2, 3, 4, 56, 8, 34, 7, 345, 8, 3]);
console.log(result);

// 堆排序
function sortD(arr) {
	for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
		addHeap(i, arr, arr.length);
	}
	for(let i = arr.length - 1; i >= 0; i--) {
		const emp = arr[0];
		arr[0] = arr[i];
		arr[i] = emp;
		addHeap(0, arr, i);
	}
	return arr;
}

function addHeap(k, arr, length) {
  let tmp = arr[k];
  for (let i = 2 * k + 1; i < length; i = 2 * i + 1) {
    if (i + 1 < length && arr[i + 1] > arr[i]) {
      i = i + 1;
    }
    if (arr[i] > tmp) {
      arr[k] = arr[i];
      k = i;
    } else {
      break;
    }
  }
	arr[k] = tmp;
}
