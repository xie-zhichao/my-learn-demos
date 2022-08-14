function queue<T = string>(queueLenght = 10) {
  const queueArray = new Array<T>();
  let head = 0;
  let tail = 0;

  function enQueue(item: T) {
    if (tail === queueLenght) {
      if (head === 0) return false;
      for (let i = 0; i < tail - head; i++) {
        queueArray[i] = queueArray[i + 1];
      }

      tail -= head;
      head = 0;
    }
    queueArray[tail] = item;
    tail++;
    return true;
  }

  function deQueue() {
    if (head === tail) return null;
    const item = queueArray[head];
    head++;
    return item;
  }

  function print() {
    console.log(queueArray.join('|'), head, tail);
  }

  return {
    enQueue,
    deQueue,
    print,
  };
}

const queue1 = queue();
for (let i = 0; i < 12; i++) {
  console.log(queue1.enQueue(String(i)));
}
console.log(queue1.enQueue(queue1.deQueue()));
console.log(queue1.enQueue(queue1.deQueue()));
queue1.print();
