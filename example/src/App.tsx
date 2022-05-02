import React, { PropsWithChildren } from 'react';

import { TreeView, TreeNode, TreeViewProps } from 'treeview-component';
import NodeView from './components/NodeView';
import EmptyNode from './components/EmptyNode';
import 'treeview-component/lib/esm/src/styles.module.css';
import styles from './classes.module.css';

class App extends React.Component<PropsWithChildren<any>, { tree: TreeNode }> {
  constructor(props: PropsWithChildren<any>) {
    super(props);
    this.state = {
      tree: {
        node: '00',
        parent_node: null,
        title: 'First node',
        description: 'Some description for node.',
        children: [
          {
            node: '10',
            parent_node: '00',
            title: 'Second node',
            description: 'Some description for node.',
            children: [null],
          },
          {
            node: '11',
            parent_node: '00',
            title: 'Third node',
            description: 'Some description for node.',
            children: [null, null],
          },
        ],
      },
    };
  }

  addCardFunc = (node: TreeNode, newTree: TreeNode) => {
    let tree = newTree;
    const walker = (cell: TreeNode | null) => {
      if (!cell) {
        return;
      }
      cell.children.forEach((child: TreeNode | null, id: number) => {
        if (child && child.node === node.node) {
          cell.children[id] = {
            node: child.node,
            parent_node: cell.node,
            title: 'Added node',
            description: 'This node was added by click',
            children: [null, null],
          };
        }
        walker(child);
      });
    };
    walker(tree);
    this.setState({
      tree: tree,
    });
  };

  addCard = (event: React.MouseEvent<HTMLElement, MouseEvent>, data: { node: TreeNode, newTree: TreeNode }) => {
    this.addCardFunc(data.node, data.newTree);
  };

  render() {
    const treeProps: TreeViewProps = {
      autoCenter: true,
      nodeView: NodeView,
      nodeViewClasses: styles,
      showEmptyNodes: true,
      emptyNode: EmptyNode,
      emptyNodeProps: {
        onClick: this.addCard,
        className: styles.add_card,
      },
      tree: this.state.tree,
      style: {
        cursor: 'auto',
        outline: 'none',
      },
    };
    return (
      <div className="wrapper">
        <TreeView {...treeProps} />
      </div>
    );
  }
}

export default App;
