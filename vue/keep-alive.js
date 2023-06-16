function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) !== -1;
  } else if (typeof name === 'regExp') {
    return pattern.test(name);
  }
  return false;
}

function pruneCache(cache, current, filter) {
  for (const key in cache) {
    const cachedNode = cache[key];
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}
function pruneCacheEntry(vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}
export default {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes
  },
  created() {
    this.cache = Object.create(null);
  },
  destroy() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache[key]);
    }
  },
  watch: {
    include(val) {
      pruneCache(this.cache, this._vnode, (name) => matches(val, name));
    },
    exclude(val) {
      pruneCache(this.cache, this._vnode, (name) => !matches(val, name));
    }
  },
  reander() {
    const vnode = getFirstComponentChild(this.$slots.default);
    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      const name = getComponentName(componentOptions);
      if ((name && this.include && !matches(this.include, name)) || (this.exclude && matches(this.exclude, name))) {
        return vnode;
      }
      const key = vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }

      vnode.data.keepAlive = true;
    }
    return vnode;
  }
};
