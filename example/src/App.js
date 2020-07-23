import React from 'react'

import TreeView from 'treeview-component'
import NodeView from './components/NodeView'
import EmptyNode from './components/EptyNode'
import 'treeview-component/dist/index.css'
import styles from './classes.module.css'

class App extends React.Component {
  constructor() {
    super()
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
            children: [null]
          },
          {
            node: '11',
            parent_node: '00',
            title: 'Third node',
            description: 'Some description for node.',
            children: [null, null]
          }
        ]
      }
    }
  }

  findByNode = (parentNode, index) => {
    let tree = this.state.tree;
    const walker = (cell) => {
      if (!cell) {
        return
      }
      if (cell.node === parentNode) {
        cell.children[index] = {
          parent_node: cell.node,
          title: 'Added node',
          description: 'This node was added by click',
          children: [null, null],
        }
        return
      }
      cell.children.forEach((child) => {
        walker(child)
      })
    }
    walker(tree)
    this.setState({
      tree: tree
    })
  }

  addCard = (event, data) => {
    this.findByNode(data.parent_node, data.index)
    console.log('CLICKED :>> ');
  }

  render() {
    const treeProps = {
      autoCenter: true,
      nodeView: NodeView,
      nodeViewClasses: styles,
      showEmptyNodes: true,
      emptyNode: EmptyNode,
      tree: this.state.tree,
      emptyNodeProps: {
        onClick: this.addCard,
        className: styles.add_card
      },
      style: {
        cursor: 'auto'
      }
    }
    return <div className="wrapper">
        <TreeView {...treeProps} />
      </div>
  }
}

export default App
