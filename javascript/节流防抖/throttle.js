function throttle(fn, timeout = 500) {
  let _timer = null

  return function(...args) {
    let _this = this

    if (!_timer) {
      _timer = setTimeout(() => {
        fn.apply(_this, args)
      }, timeout)
    }
  }
}