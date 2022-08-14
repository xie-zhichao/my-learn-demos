var name = 'hi'
function foo() {
  console.log(this.name)
  
  function far() {
    console.log(this.name)

    return 'far'
  }

  return far()
}

foo()

var obj = {
  name: 'hello',
  foo,
}

obj.foo()
