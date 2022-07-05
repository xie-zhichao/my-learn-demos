/**
 * promise learn
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * my promise
 * @param {*} executor
 */
function MyPromise(executor) {
  const self = this;
  self.state = PENDING;
  self.value = void 0;
  self.reason = void 0;

  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED;
      self.value = value;

      self.onFulfilledCallbacks.forEach((onFulfilled) => {
        onFulfilled(value);
      });
    }
  }

  function reject(reason) {
    if (self.state === PENDING) {
      self.state = REJECTED;
      self.reason = reason;

      self.onRejectedCallbacks.forEach((onRejected) => {
        onRejected(reason);
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;
  let thenPromise = void 0;

  onFulfilled = onFulfilled ? onFulfilled : (value) => value;
  onRejected = onRejected
    ? onRejected
    : (reason) => {
        throw reason;
      };

  thenPromise = new MyPromise(function (resolve, reject) {
    if (self.state === PENDING) {
      self.onFulfilledCallbacks.push((value) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(value);
            self.resolvePromise(thenPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });

      self.onRejectedCallbacks.push((reason) => {
        setTimeout(() => {
          try {
            const x = onRejected(reason);
            self.resolvePromise(thenPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (self.state === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(self.value);
          self.resolvePromise(thenPromise, x, resolve, reject);
        } catch (error) {
          onRejected(error);
        }
      }, 0);
    }

    if (self.state === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(self.reason);
          self.resolvePromise(thenPromise, x, resolve, reject);
        } catch (error) {
          onRejected(error);
        }
      }, 0);
    }
  });

  return thenPromise;
};

MyPromise.prototype.resolvePromise = function (promise, x, resolve, reject) {
  const self = this;
  let called = false;

  if (promise === x) {
    return reject(new TypeError('repeat reference'));
  }

  if (
    x != null &&
    ['[object Object]', 'object Function'].includes(
      Object.prototype.toString.call(x)
    )
  ) {
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            self.resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

MyPromise.prototype.finally = function (fn) {
  return this.then(
    (value) => {
      fn();
      return value;
    },
    (reason) => {
      fn();
      throw reason;
    }
  );
};

MyPromise.prototype.done = function () {
  this.catch((reason) => {
    throw reason;
  });
};

MyPromise.prototype.all = function (promiseArray) {
  return new MyPromise(function (resolve, reject) {
    const values = [];
    let len = 0;

    promiseArray.forEach((p, i) => {
      p.then((value) => {
        values[i] = value;
        len++;
        if (len === promiseArray.length) {
          resolve(values);
        }
      }, reject);
    });
  });
};

MyPromise.prototype.race = function (promiseArray) {
  return new MyPromise(function (resolve, reject) {
    for (p of promiseArray) {
      p.then((value) => {
        resolve(value);
      }, reject);
    }
  });
};

MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => {
    resolve(value);
  });
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

MyPromise.deffered = function () {
  const dfd = {};

  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });

  return dfd;
};

module.exports = MyPromise;
