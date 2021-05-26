const sortNodes = (nodes) => {
  const compare = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  };
  return nodes.sort(compare);
};

const findFirstFreeId = (nodes) => {
  const sortedNodes = sortNodes([...nodes]);
  for (let i = 0; i < 999; i++) {
    if (sortedNodes[i].id !== i) {
      return i;
    }
  }
};

const flatNodesToTree = (nodes) => {
  let treeNodes = nodes.map((treeNode) => ({
    ...treeNode,
    children: [],
  }));
  let map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < treeNodes.length; i += 1) {
    map[treeNodes[i].id] = i;
  }

  for (i = 0; i < treeNodes.length; i += 1) {
    node = treeNodes[i];
    if (node.pid !== null) {
      treeNodes[map[node.pid]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};

const removeNodesFamily = (
  id = 0,
  [node, ...more] = [],
  s = new Set([id]),
  r = []
) =>
  node === undefined ? r : s.has(node.id) || s.has(node.pid)
    ? removeNodesFamily(id,[...r, ...more],s.add(node.id),[])
    : removeNodesFamily(id,more,s,[...r, node]);

export { sortNodes, findFirstFreeId, flatNodesToTree, removeNodesFamily };
