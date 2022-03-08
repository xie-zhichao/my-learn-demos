export class FNode {
  userId: number;
  friends: Set<number>;
  degree: number;

  constructor(userId: number) {
    this.userId = userId;
    this.friends = new Set();
    this.degree = 0;
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
    userNodes[friendId1].friends.add(friendId2);
    userNodes[friendId2].friends.add(friendId1);
  }
}

function bfs(userNodes: FNode[], userId: number) {
  if (userId >= userNodes.length) return;

  const queue = new Array<number>();
  const visited = new Set<number>();

  queue.push(userId);
  visited.add(userId);

  while (queue.length > 0) {
    const curUserId = queue.shift();
    console.log(`用户：${curUserId}`);
    if (!userNodes[curUserId]) continue;

    userNodes[curUserId].friends.forEach((fid) => {
      if (!userNodes[fid]) return;
      if (visited.has(fid)) return;

      queue.push(fid);
      visited.add(fid);
      userNodes[fid].degree = userNodes[curUserId].degree + 1;
      console.log(`\t${userNodes[fid].degree}度好友: ${fid}`);
    });
  }
}

initUserFriends(20);
bfs(userNodes, 0);
