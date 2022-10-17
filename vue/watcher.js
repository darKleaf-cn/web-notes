import Dep, { pushTarget, popTarget } from './Dep';
import { queueWatcher } from './scheduler.js';

let uid = 0;
export class Watcher {
  vm;
  expOrFn;
  cb;
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    vm._watchers.push(this);
    this.id = uid++;
    this.cb = cb;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.value = this.get();
    this.getter = expOrFn;
  }
  get() {
    pushTarget(this);
    let value;
    value = this.getter.call(this.vm, this.vm);
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
    return value;
  }
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }
  update() {
    if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  }
  run() {
    const value = this.get();
    const oldValue = this.value;
    this.cb.call(this.vm, value, oldValue);
  }
}
