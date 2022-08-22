const a = new Promise((resolve)=>resolve(1));
const b = function(){};
Promise.all([b]).then((value)=> console.log(value))