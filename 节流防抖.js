// 节流

/**
 * 防抖：在一定时间间隔，多次触发只有一次触发发生
 * 场景：搜索框输入查询，如果用户一直在输入中，没有必要不停地调用接口，等用户停止输入的时候，在调用，设置一个合适的时间间隔
 */

function debounce(fn, delay) {
  let timer = null;
  return function _debounce(...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}
