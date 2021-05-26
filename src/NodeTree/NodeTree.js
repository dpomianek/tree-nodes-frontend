import './NodeTree.css';

const NodeTree = ({ node }) => {
  return (
    <div className="Node">
      <input type="radio" value={node.id} name="node" />
      {node.name}
      {node.children.map((child) => <NodeTree key={child.id} node={child} />)}
    </div>
  );
};

export default NodeTree;
