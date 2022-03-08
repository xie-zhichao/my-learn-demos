export class FNode {
  userId: number;
  friends: Map<number,number>;

  constructor(userId: number) {
    this.userId = userId;
    this.friends = new Map();
  }
}

const userNodes = new Array<FNode>(10);

for (let i = 0; i < 10; i++) {
  userNodes[i] = new FNode(i);
}

function initUserFriends(realationsNums: number) {
  for (let i = 0; i < realationsNums; i++) {
    const friendId1 = Math.floor(Math.random() * 10);
    const friendId2 = Math.floor(Math.random() * 10);
    if (friendId1 === friendId2) continue;
    userNodes[friendId1].friends.set(friendId2, Math.random());
  }
}

function djs(userNodes: FNode[], userId: number) {
  if (userId >= userNodes.length) return;

  const mw = new Array<number>();
  const f = new Set<number>();

  let s = userId;
  mw[s] = 0;

  while (1) {
    const node = userNodes[s];
    if (!node) {
      throw new Error('node is null');
    }

    f.add(s);
    node.friends.forEach((v, k) => {
      if (!mw[k] || mw[s] + v < mw[k]) {
        mw[k] = mw[s] + v;
      }
    });

    let mv = 0;
    let mk = -1;
    mw.forEach((v, i) => {
      if (f.has(i)) return;
      if (mv === 0 || v < mv) {
        mv = v;
        mk = i;
      }
    });

    if (mk >= 0) {
      s = mk;
    } else {
      break;
    }
  }

  console.log(mw);
}

initUserFriends(20);
console.log(userNodes);
djs(userNodes, 0);
