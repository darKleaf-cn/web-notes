const a = { c: { b: 1 } };
Object.defineProperty(a.c, 'b', {
  get() {
    console.log(this);
    return 1;
  },
  set(q) {
    console.log(this);
  }
});
JSON.stringify(a)
// a.b = 1;
