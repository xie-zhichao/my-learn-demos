function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return null;
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  
  // 循环
  if (hash.get(obj)) return hash.get(obj)

  const cloneObj = new obj.constructor()

  hash.set(obj, cloneObj)

  for(k in obj) {
    if (obj.hasOwnProperty(k)) {
      cloneObj[k] = deepClone(obj[k])
    }
  }

  return cloneObj
}