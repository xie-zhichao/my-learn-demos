function myReduce(array, cb, initVal) {
  let preVal = initVal || array[0];

  for (i = initVal ? 0 : 1; i < array.length; i++) {
    preVal = cb(preVal, array[i], i, array);
  }

  return preVal;
}
