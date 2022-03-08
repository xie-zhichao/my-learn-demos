'use strict';
const foo = {
  count: 1,
  set rule(val) {
    console.log(`set rule ${val}`)
  }
}
Object.defineProperty(foo, 'count', {
  writable: false,
})
const far = Object.create(foo)

// console.log(far.count)
// console.log(Object.getOwnPropertyNames(far))
// far.count = 2
// console.log(foo.count)
// console.log(far.count)
// console.log(Object.getOwnPropertyNames(far))

far.rule = 'limit 1'
console.log(far.rule)