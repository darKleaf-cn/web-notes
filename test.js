const result = sort([2, 3, 4, 56, 8, 34, 7, 345, 8, 3]);
console.log(result);

function sort(arr) {
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
function addHeap(k, arr, l) {
	const emp = arr[k];
	for(let i = 2 * k + 1; i < l; i = i * 2 + 1) {
		if(i + 1 < l && arr[i + 1] > arr[i]) {
			i++;
		}
		if (arr[i] > emp) {
			arr[k] = arr[i];
			k = i;
		} else {
			break;
		}
	}
	arr[k] = emp;
}