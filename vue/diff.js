/**
 * diff算法
 * patch比较新老vnode
 * 1、只比较同层级节点而非逐层搜索遍历，针对同层同节点再次递归比较；
 * 2、
 */
function patch(oldVnode, vnode) {
  if (isUndef(vnode)) {
    // vnode不存在则直接return
    if (isDef(oldVnode)) {
      // 销毁旧节点
    }
    return;
  }

  if (isUndef(oldVnode)) {
    // 直接创建新节点
    createElm(vnode);
  } else {
    // 如果是相同节点的时候开始patch
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode);
    }
  }
}

/**
 * 判断两个VNode节点是否是同一个节点，需要满足以下条件
 * key相同
 * tag（当前节点的标签名）相同
 * isComment（是否为注释节点）相同
 * 是否data都有定义
 * 当标签是input的时候，type必须相同
 * @param {*旧节点} a
 * @param {*新节点} b
 * @returns
 */
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  );
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }
  const typeA = isDef(a.data) && isDef(a.data.attrs) && a.data.attrs.type;
  const typeB = isDef(b.data) && isDef(b.data.attrs) && b.data.attrs.type;
  return typeA === typeB;
}

export function isUndef(v) {
  return v === undefined || v === null;
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

/**
 * patchVnode的规则：
 * 1、如果新旧Vnode都是静态的，同时他们的key相同，代表是同一节点，并且新的VNode是clone或者是标记v-once，那么只需要替换elm以及componentInstance即可
 * 2、新老节点均有children子节点，则对子节点进行diff操作，调用updateChildren；
 * 3、如果老节点没有子节点而新节点存在子节点，先清空老节点dom的文本内容，然后为当前dom节点加入子节点；
 * 4、当新节点没有子节点而老节点有子节点的时候，移除该dom节点的所有子节点；
 * 5、当新老节点都没子节点的时候，只是文本的替换；
 * ### 文本节点才会有文本text属性
 * @param {*旧节点} oldVnode
 * @param {*新节点} vnode
 * @returns
 */
function patchVnode(oldVnode, vnode) {
  if (oldVnode === vnode) {
    return;
  }
  // 虚拟节点对应的真实dom节点
  const elm = (vnode.elm = oldVnode.elm);
  // 旧节点和新节点的子节点
  const oldCh = oldVnode.children;
  const ch = vnode.children;
  // 如果新节点不是文本节点
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      // 如果新旧节点都有子节点并且不相同，则对子节点进行diff操作
      if (oldCh !== ch) {
        updateChildren(elm, oldCh, ch);
      }
    } else if (isDef(ch)) {
      // 如果老节点没有子节点而新节点有子节点，则为当前节点加入子节点
    } else if (isDef(oldCh)) {
      // 如果老节点有子节点而新节点没有子节点，则移除所有当前节点的子节点
    } else if (isDef(oldVnode.text)) {
      // 当前老节点都没有子节点，而老节点存在文本的时候，移除当前节点的文本
    }
  } else if (oldVnode.text !== vnode.text) {
    // 如果新节点和旧节点都是文本节点，并且文本不同
    // 那么进行文本替换
  }
}

/**
 *
 * @param {*} parentElm
 * @param {*} oldCh
 * @param {*} newCh
 */
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let newEndIdx = newCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
	let oldKeyToIdx, idxInOld;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      // 将oldStartVnode移动到oldEndVnode后面
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
			// 生成一盒key与旧VNode的key对应的哈希表，key为VNode的key，value为VNode的索引，比如{key0: 0, key1: 1, key2: 2}
			if (isUndef(oldKeyToIdx)) {
				oldKeyToIdx = {};
			}
			idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
			if (isUndef(idxInOld)) {
				// 如果不存在对应的key，则创建一个newStartVnode插入到oldStartVnode前面；
			} else {
				// 如果转到相同的key，则将其转移到oldStartVnode前面
			}
		}
  }

	if (oldStartIdx > oldEndIdx) {
		// 全部比较后，老节点遍历完了，说明新节点比老节点多，这时候要把新节点创建出来并插入其中；
	} else if (newStartIdx > newEndIdx) {
		// 全部比较厚，新节点遍历玩了，说明老节点还有剩余，把剩余的老节点移除
	}
}
