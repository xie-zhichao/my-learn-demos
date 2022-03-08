function myModule() {
  const myModules = {};

  function define(name, deps, implement) {
    const depModules = deps.map((dep) => myModules[dep]);
    myModules[name] = implement.apply(implement, depModules);
  }

  function get(name) {
    const module = myModules[name];
    if (module) return module;
    throw new Error(`module ${name} is not defined!`);
  }

  return {
    define,
    get,
  };
}

const moduleOne = myModule();

moduleOne.define('foo', [], function foo() {
  function hi(name) {
    return `Hi, ${name}!`;
  }

  return {
    hi,
  };
});

moduleOne.define('bar', ['foo'], function (foo) {
  function hi(name) {
    return `Hi from ${foo.hi(name)}`;
  }

  return {
    hi,
  };
});

// console.log(moduleOne.get('bar').hi('Tom'));

const myObj = {
  count: 0,
  fn() {
    console.log(this, this.count);
  },
};

myObj.fn();
setTimeout(myObj.fn, 500);

if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // 与 ECMAScript 5 最接近的
      // 内部 IsCallable 函数
      throw new TypeError(
        'Function.prototype.bind - what is trying ' + 'to be bound is not callable',
      );
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {},
      fBound = function () {
        return fToBind.apply(
          this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)),
        );
      };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}
