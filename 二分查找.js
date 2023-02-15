function binarySearch(arr, left, right, key, flag) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (flag) {
      if (arr[mid] >= key) {
        if (mid === 0 || arr[mid - 1] < key) {
          return mid;
        }
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (arr[mid] <= key) {
        if (mid === arr.length - 1 || arr[mid + 1] > key) {
          return mid;
        }
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
}
