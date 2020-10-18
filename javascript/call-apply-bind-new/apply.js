Function.prototype.myApply = function (context, args) {
  const fnKey = Symbol('myCall')
  const thisContext = context || globalThis
  thisContext[fnKey] = this
  thisContext[fnKey](...args)
  delete thisContext[fnKey]
}

function foo (...args) {
  console.log(this.name)
  console.log(args)
}

foo.myApply({name: 'foo'}, [1])