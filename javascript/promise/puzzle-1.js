let MyPromise = require('./my-promise-2');

MyPromise.resolve()
.then(() => {
    console.log(1);
    MyPromise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3))
})
.then(() => console.log(4))