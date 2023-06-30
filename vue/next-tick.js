const callbacks = [];
let pending = false;
let timerFunc;

function nextTickHandler() {
  pending = false;
  const copies = callbacks.slice();
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(nextTickHandler);
  };
} else if (typeof MutationObserver !== 'undefined') {
  let count = 1;
  const observer = new MutationObserver(nextTickHandler);
  const textNode = document.createTextNode(String(count));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = () => {
    count++;
    textNode.data = String(count);
  };
} else {
  timerFunc = () => {
    setTimeout(nextTickHandler, 0);
  };
}

export function nextTick(cb, ctx) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx);
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      _resolve = resolve;
    });
  }
}
