/**
 * prototype在继承的对象里面，是共享的
 */

const obj = {
  name: 'fun',
  hi: function () {
    console.log(`Hi, my name is ${this.name}!`);
  }
};

function foo (id) {
  this.id = id;
}

foo.prototype = obj;

let foo1 = new foo(1);
let foo2 = new foo(2);

obj.name = 'foo';

console.log(foo1.__proto__ === foo2.__proto__);
console.log(foo1.name);
console.log(foo2.name);

