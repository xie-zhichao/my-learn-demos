const obj = {
  name: 'tom'
}

const p1 = new Proxy(obj, {
  get (target, prop, receiver) {
    console.log(prop)

    return prop === 'name' ? `hi, i am ${Reflect.get(target, prop)}` : Reflect.get(target, prop)
  },
  set (target, prop, value, receiver) {

  },
  deleteProperty (target, prop) {

  }
})
