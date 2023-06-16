// 初始化事件
function initEvents(vm) {
  // 在vm上创建一个_events对象，用来存放事件
  vm._events = Object.create(null);
  // 这个bool标志位来表明是否存在钩子，而不需要通过哈希表的方法来查找是否有钩子，这样可以较少不必要的开销，优化性能
  vm._hasHookEvenet = false;

  const listeners = vm.$opeions._parentListeners;
}

// $on方法用来在vm实例上监听一个自定义事件，该事件可用$emit触发

Vue.prototype.$on = function (event, fn) {
  const vm = this;
  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      this.$on(event[i], fn);
    }
  } else {
    const obj = vm.events[event] || (vm.events[event] = []);
    obj.push(fn);
  }
  return vm;
};

// $once监听一个只能触发一次的事件，在触发以后会自动移除该事件

Vue.prototype.$once = function (event, fn) {
  const vm = this;
  function on() {
    vm.$off(event, on);
    fn.apply(vm, arguments);
  }
  on.fn = fn;
  vm.$on(event, on);
  return vm;
};

// $off 用来移除自定义事件
Vue.prototype.$off = function (event, fn) {
  const vm = this;
  if (!arguments.length) {
    vm._events = Object.create(null);
    return vm;
  }
  if (Array.isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      vm.$off(event[i], fn);
    }
  }

  const cbs = vm._events[event];
  if (!cbs) {
    return;
  }
  if (arguments.length === 1) {
    vm._events[event] = null;
    return vm;
  }

  let cb;
  let i = cbs.length;
  while (i--) {
    cb = cbs[i];
    if (cb === fn || cb.fn === fn) {
      cbs.splice(i, 1);
      break;
    }
  }
  return vm;
};

// $emit 用来触发指定的自定义事件
Vue.prototype.$emit = function (event) {
  const vm = this;
  let cbs = vm._events[event];
  if (cbs) {
    const args = arguments.slice(1);
    for (let i = 0; i < cbs.length; i++) {
      cbs[i].apply(vm, args);
    }
  }
};
