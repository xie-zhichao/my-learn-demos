function myNew() {
  const args = [].slice.call(arguments)
  const contructor = args.shift()
  const newObj = Object.create(contructor.prototype)
  const resObj = contructor.apply(newObj, args)

  return resObj instanceof Object ? resObj : newObj
}
