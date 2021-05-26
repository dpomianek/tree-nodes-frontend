import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flatNodesToTree } from '../helpers/nodes-helpers';
import NodeTree from '../NodeTree/NodeTree';
import { getNodes, putNodes, nodesActions } from '../store';
import './NodesTree.css';

const NodesTree = () => {
  const { nodes, message } = useSelector((state) => state);
  const [selectedNodeId, setSelectedNodeId] = useState(0);
  const [updateName, setUpdateName] = useState('');
  const [updateToggle, setUpdateToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    nodes.length === 0 && dispatch(getNodes());
  }, [nodes, dispatch]);

  const selectedNodeChangeHandler = (event) => {
    if (event.target.type === 'radio') {
      setSelectedNodeId(event.target.value);
      const index = nodes.findIndex(
        (node) => node.id === parseInt(event.target.value)
      );
      setUpdateName(nodes[index].name);
    }
  };
  const addButtonClickHandler = () => {
    dispatch(nodesActions.add(parseInt(selectedNodeId)));
  };
  const updateButtonClickHandler = () => {
    if (!updateToggle) {
      setUpdateToggle(!updateToggle);
    } else {
      dispatch(
        nodesActions.update({
          id: parseInt(selectedNodeId),
          name: updateName,
        })
      );
      setUpdateToggle(!updateToggle);
    }
  };
  const deleteButtonClickHandler = () => {
    dispatch(nodesActions.delete(parseInt(selectedNodeId)));
  };
  const saveButtonClickHandler = () => {
    dispatch(putNodes(nodes));
  };

  const updateInputChangeHandler = (event) => {
    setUpdateName(event.target.value);
  };

  return (
    <div className="Nodes" onChange={selectedNodeChangeHandler}>
      {message && <div className="Nodes--message">{message}</div>}
      {selectedNodeId !== 0 && (
        <div className="Nodes--buttons">
          <button onClick={addButtonClickHandler}>Add</button>
          {updateToggle && (
            <input
              type="text"
              value={updateName}
              onChange={updateInputChangeHandler}
            />
          )}
          <button
            className={updateToggle ? 'active' : undefined}
            onClick={updateButtonClickHandler}
          >
            Update
          </button>
          <button onClick={deleteButtonClickHandler}>Delete</button>
          <button onClick={saveButtonClickHandler}>Save</button>
        </div>
      )}
      {flatNodesToTree(nodes).map((node) => (
        <NodeTree key={node.id} node={node} />
      ))}
    </div>
  );
};

export default NodesTree;
