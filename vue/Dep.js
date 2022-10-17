//Dep
let uid = 0;
export class Dep {
  static target;
  id;
  subs;
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  addSubs(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    const i = this.subs.indexOf(sub);
    if (i !== -1) {
      this.subs.splice(i, 1);
    }
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;
const targetStack = [];
export function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
