// 节流：n秒内只运行一次，若在n秒内重复触发，只有一次生效

function throttled1(fn, delay) {
  let timer = null;
  return function _debounce(...arg) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arg);
        timer = null;
      }, delay);
    }
  };
}

function throttled2(fn, delay) {
  let oldTime = Date.now();
  return function _debounce(...arg) {
    const newTime = Date.now();
    if (newTime - oldTime >= delay) {
      fn.apply(this, arg);
      oldTime = Date.now();
    }
  };
}

function throttled(fn, delay) {
  let timer = null;
  let oldTime = Date.now();
  return function _throttled(...arg) {
    const newTime = Date.now();
    const remainTime = delay - (newTime - oldTime);
    clearTimeout(timer);
    if (remainTime <= 0) {
      fn.apply(this, arg);
      oldTime = Date.now();
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arg);
        oldTime = Date.now();
      }, delay);
    }
  };
}

/**
 * 防抖：n秒后执行该事件，若在n秒内重复触发，则重新计时
 */

function debounce(fn, delay) {
  let timer = null;
  return function _debounce(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function debounce1(fn, delay, immediate) {
  let timer = null;
  return function _debounce(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const flag = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (flag) {
        fn.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay)
    }
  }
}