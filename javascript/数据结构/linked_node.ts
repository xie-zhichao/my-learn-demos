interface LinkedNode {
  value: string;
  next?: LinkedNode;
}

function createLinkedNode(value: string, next?: LinkedNode): LinkedNode {
  return {
    value,
    next,
  };
}

function lruCache(maxSize = 10) {
  let first: LinkedNode = null;
  let cacheSize = 0;

  function updateCache(value: string) {
    let curNode: LinkedNode = first;
    let prevNode: LinkedNode = null;
    while (curNode) {
      if (curNode.value === value) {
        if (curNode === first) return;
        prevNode.next = curNode.next;
        curNode.next = first;
        first = curNode;
        return;
      }
      prevNode = curNode;
      curNode = curNode.next;
    }

    if (cacheSize >= maxSize) {
      let curNode: LinkedNode = first;
      while (curNode.next && curNode.next.next) {
        curNode = curNode.next;
      }
      if (curNode.next) curNode.next = null;
      else first = null;
      cacheSize--;
    }

    const newNode = createLinkedNode(value, first);
    first = newNode;
    cacheSize++;
  }

  function reverse() {
    if (!first) return;
    let curNode: LinkedNode = first.next;
    let newFirst: LinkedNode = first;
    let moveNode: LinkedNode = null;

    first.next = null;

    while (curNode) {
      moveNode = curNode;
      curNode = curNode.next;
      moveNode.next = newFirst;
      newFirst = moveNode;
    }

    first = newFirst;
  }

  return {
    updateCache,
    print,
    reverse,
  };
}

function print(head: LinkedNode) {
  let curNode: LinkedNode = head;
  const values: string[] = [];

  while (curNode) {
    values.push(curNode.value);
    curNode = curNode.next;
  }

  console.log(`link list: ${values.join(',')}`);
}

/**
 * case1
 */
// const cache1 = lruCache(5);

// for (let i = 0; i < 20; i++) {
//   const value = Math.floor(Math.random() * 10);
//   console.log(`access{${i + 1}}: ${value}`);
//   cache1.updateCache(String(value));
//   cache1.print();
// }

// cache1.reverse();
// cache1.print();

const ln1: LinkedNode = {
  value: '1',
  next: null,
};

const ln2: LinkedNode = {
  value: '2',
  next: ln1,
};

const ln3: LinkedNode = {
  value: '3',
  next: ln2,
};

const ln4: LinkedNode = {
  value: '4',
  next: ln3,
};

// ln1.next = ln3;

function circleCheck(head: LinkedNode) {
  if (!head) return false;

  let fast: LinkedNode = head;
  let slow: LinkedNode = head;

  while (fast && slow) {
    fast = fast.next;

    if (fast === slow) return true;

    slow = slow.next;
    fast = fast.next;
  }

  return false;
}

// console.log(circleCheck(ln4));

function removeLast(head: LinkedNode, lastIndex: number) {
  let fast: LinkedNode = head;
  let slow: LinkedNode = head;
  let step = lastIndex;

  while (step) {
    if (!fast) return null;
    fast = fast.next;
    step--;
  }
  console.log(fast.value)
  while(fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  const removedNode = slow.next;
  slow.next = removedNode.next;

  return removedNode;
}

// removeLast(ln4, 1);
// print(ln4);

function mergeOrdered(head1: LinkedNode, head2: LinkedNode) {
  if (!head1 || !head2) return null;
  let newHead: LinkedNode = head1;
  let m1: LinkedNode = head1;
  let m2: LinkedNode = head2;

  if (head1.value > head2.value) {
    newHead = head2;
    m1 = head2;
    m2 = head1;
  }

  while(m2) {
    while(m1.next && m1.next.value <= m2.value) {
      m1 = m1.next;
    }

    const moveNode = m2;
    m2 = moveNode.next;
    moveNode.next = m1.next;
    m1.next = moveNode;
  }

  return newHead;
}

const ln11: LinkedNode = {
  value: 'p',
  next: null,
};

const ln12: LinkedNode = {
  value: 'i',
  next: ln11,
};

const ln13: LinkedNode = {
  value: 'h',
  next: ln12,
};

const ln14: LinkedNode = {
  value: 'c',
  next: ln13,
};

const ln21: LinkedNode = {
  value: 'u',
  next: null,
};

const ln22: LinkedNode = {
  value: 's',
  next: ln21,
};

const ln23: LinkedNode = {
  value: 'd',
  next: ln22,
};

const ln24: LinkedNode = {
  value: 'a',
  next: ln23,
};

print(mergeOrdered(ln14, ln24));
