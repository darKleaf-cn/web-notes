class Store {
  constructor(options = {}) {
    let { state = {} } = options;
    if (typeof state === 'function') {
      state = state();
    }

    // 用来判断严格模式下是否使用mutation修改state的
    this._committing = false;
    this._actions = Object.create(null);
    this._muattions = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._watcherVM = new Vue();

    const store = this;
    this.strict = strict;

    // 初始化根module，这也同时递归注册了所有子module，收集所有module的getter到_wrappedGetters中去
    // this._modules.root代表根module才独有保存的module对象
    installModule(this, state, [], this._modules.root);
  }

  // 保证通过mutation修改store的数据
  _widthCommit(fn) {
    const commiting = this._committing;
    this._committing = true;
    fn();
    this._committing = commiting;
  }

  commit(_type, _payload, _options) {
    // 校验整理参数
    const { type, payload, options } = unifyObjectStyle(_type, _payload, _options);
    const mutation = { type, payload };
    const entry = this._mutations[type];
    this._widthCommit(() => {
      entry.forEach((handler) => {
        handler(payload);
      });
    });

    this._subscribers.forEach((sub) => sub(mutation, this.state));
  }

  dispatch(_type, _payload) {
    const { type, payload } = unifyObjectStyle(_type, _payload);

    const entry = this._acyions[type];
    return entry.length > 1 ? Promise.all(entry.map((handler) => handler(payload))) : entry[0](payload);
  }
}

function installModule(store, rootState, path, module, hot) {
  const isRoot = !path.length;
  const namespace = store._modules.getNamespace(path);
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  if (!isRoot) {
    const parentState = getNestedState(rootState, path.slice(0, -1));
    const moduleName = path[path.length - 1];
    store._widthCommit(() => {
      Vue.set(parentState, moduleName, module.state);
    });
  }
}

// 通过vm重设store，新建Vue对象使用Vue内部的响应式实现注册state以及computed
function resetStoreVM(store, state) {
  const oldVm = store._vm;

  store.getters = {};
  const wrappedGetters = store._wrappedGetters;
  const computed = {};
  forEachValue(wrappedGetters, (fn, key) => {
    computed[key] = () => fn(store);
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true
    });
  });

  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  });
}

function getNestedState(state, path) {
  return path.length ? path.reduce((state, key) => state[key], state) : state;
}
