# treeview-component

> TreeView for tree data structure representation

[![NPM](https://img.shields.io/npm/v/treeview-component.svg)](https://www.npmjs.com/package/treeview-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![DemoImage](Screenshot_7.png)

## Install

```bash
npm install --save treeview-component
```

## Properties
|Name|Description|
|---|---|
|nodeView|component which will represent as non-empty vertex|
|nodeViewClasses|imported styles for vertex|
|showEmptyNodes|boolean flag for showing empty vertexes|
|emptyNode|component which represent empty vertex|
|emptyNodeProps|properties for empty vertexes component|
|tree|object of tree structure for visualization|

## Usage

```jsx
import React, { Component } from 'react'

import TreeView from 'treeview-component'
import 'treeview-component/dist/index.css'

class Example extends Component {

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
  
  // ...

  render() {
    const treeProps = {
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
        outline: 'none'
      }
    }
    return <div className="wrapper">
        <TreeView {...treeProps} />
      </div>
  }
}
```

## License

MIT © [pavloid21](https://github.com/pavloid21)
