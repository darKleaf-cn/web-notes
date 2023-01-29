/**
 * 堆是一种特殊的完全二叉树
 * 最大堆：父节点的键值总是大于等于任何一个子节点的键值
 * 最小堆：父节点的键值总是小于等于任何一个子节点的键值
 * 如果根元素的索引是0，总共有n个元素，那么最后一个非叶子结点的索引就是Math.floor(n / 2 - 1)
 * 如果父节点的索引是i，那么对应的两个子元素分别为i*2+1，i*2+2
 * @param {number} k 父节点索引
 * @param {array} arr 待构建数组
 * @param {number} length 堆的长度
 */

function addHeap(k, arr, length) {
  const tmp = arr[k];
  for (let i = k * 2 + 1; i < length; i = i * 2 + 1) {
    if (i + 1 < length && arr[i + 1] > arr[i]) {
      i++;
    }
    if (arr[i] > arr[k]) {
      arr[k] = arr[i];
      k = i;
    } else {
      break;
    }
  }
  arr[k] = tmp;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftIndex(i) {
    return 2 * i + 1;
  }

  getRightIndex(i) {
    return 2 * i + 2;
  }

  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }

  shiftUp(index) {
    if (index === 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }

  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return this.heap[0];
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}