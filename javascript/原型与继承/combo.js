// 父类
function Sup(name) {
  this.name = name// 实例属性
}
Sup.type = '午'// 静态属性
// 静态方法
Sup.sleep =  function () {
  console.log(`我在睡${this.type}觉`)
}
// 实例方法
Sup.prototype.say = function() {
  console.log('我叫 ' + this.name)
}

// 继承实例属性/方法
function Sub(name) {
  Sup.call(this, name)
  this.name = name
}

// 继承原型属性/方法
Sub.prototype = Object.create(Sup.prototype)
Sub.prototype.constructor = Sub

// 继承静态属性/方法
Object.keys(Sup).forEach(prop => Sub[prop] = Sup[prop])
