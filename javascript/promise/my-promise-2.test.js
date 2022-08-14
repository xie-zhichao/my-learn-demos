let MyPromise = require('./my-promise-2');

let promise1 = new MyPromise((resolve, reject) => {
  console.log('aaaa');
  setTimeout(() => {
    resolve(1111);
    console.log(1111);
  }, 1000);
});

let promise2 = new MyPromise((resolve, reject) => {
  console.log('bbbb');
  setTimeout(() => {
    reject(2222);
    console.log(2222);
  }, 2000);
});

let promise3 = new MyPromise((resolve, reject) => {
  console.log('cccc');
  setTimeout(() => {
    resolve(3333);
    console.log(3333);
  }, 3000);
});

Promise.all([promise1, promise2, promise3]).then((value) => {
  console.log('all value', value);
}, (reason) => {
  console.log('all reason', reason);
})
