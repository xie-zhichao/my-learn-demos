/**
 * 实现基础功能的debounce
 * 有leading
 * @param {function} fn 
 * @param {number} wait 
 * @param {object} options 
 */
function myDebounce(fn, wait, options) {
  let _timer = undefined;
  const _this = this;
  const { leading = false } = options || {};

  return function() {
    const args = [].slice.call(arguments);
    
    if (leading && !_timer) {
      fn && fn.apply(_this, args);
    }
    
    _timer && clearTimeout(_timer);
    
    _timer = setTimeout(() => {
      fn && fn.apply(_this, args);
      _timer = undefined;
    }, wait || 0);
  }
 }