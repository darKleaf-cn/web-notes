const has = {};
let waiting = false;
let flushing = false;
let index = 0;
const queue = [];
export function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has(id)) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      let i = queue.length - 1;
      while (i >= 0 && queue.id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

function flushSchedulerQueue() {
  flushing = true;
  let watcher, id;
  queue.sort((a, b) => a.id - b.id);
  for (let index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
}
