/**
 *
 * @param {数组} arr
 * @param {左边界} left
 * @param {有边界} right
 * @param {比较值} key
 * @param {1、大于 2、小于 3、等于} flag
 */
function binarySearch(arr, left, right, key, flag) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (flag === '1') {
      if (arr[mid] >= key) {
        if (mid === 0 || arr[mid - 1] < key) {
          return arr[mid];
        }
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else if (flag === '2') {
      if (arr[mid] <= key) {
        if (mid === arr.length - 1 || arr[mid + 1] > key) {
          return arr[mid];
        }
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      if (arr[mid] === key) {
        return arr[mid];
      } else if (arr[mid] < key) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
}
