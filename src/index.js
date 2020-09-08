import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'
import { PanZoom } from 'react-easy-panzoom'
import _ from 'lodash'

class TreeView extends React.Component {
  constructor(props) {
    super(props)
    this.tree = {}
    Object.assign(this.tree, props.tree)
    this.nodeView = props.nodeView
    this.state = {
      ...TreeView.createColumnsData(this.tree)
    }
  }

  static createColumnsData = (tree) => {
    const columns = []
    const nodeReferencies = []
    const newTree = {}
    Object.assign(newTree, tree)
    const treeWalker = (treeNode, column = 0, parent = null) => {
      if (!columns[column]) {
        columns.push([])
        nodeReferencies.push([])
      }
      if (!columns[column + 1]) {
        columns.push([])
        nodeReferencies.push([])
      }
      treeNode.parent_node = parent ? parent.node : null
      treeNode.node = `${column}${columns[column].length}`
      columns[column].push(treeNode)
      nodeReferencies[column].push({
        parent_node: parent ? parent.node : null,
        node: treeNode
      })
      if (treeNode.children) {
        treeNode.children.forEach((child, id) => {
          if (child === null) {
            treeNode.children[id] = {
              children: [],
              parent_node: treeNode,
              node: `${column}${columns[column].length}`
            }
          }
          treeWalker(treeNode.children[id], column + 1, treeNode)
        })
      }
    }
    treeWalker(newTree)
    return {
      columns,
      nodeReferencies
    }
  }

  drawCurves = () => {
    document
      .querySelectorAll(`div[class*="${styles.svg_container}"]`)
      .forEach((e) => e.remove())
    const pipelineContainer = document.getElementById('tree_wrapper')
    const { nodeReferencies } = this.state
    this.state.columns.forEach((column, id) => {
      column.forEach((cell, index) => {
        if (id !== this.state.columns.length - 1) {
          const cardElement = ReactDOM.findDOMNode(
            nodeReferencies[id][index].element
          )
          const childrenElements = []
          this.state.columns[id + 1].map((child, c) => {
            if (child && child.parent_node === cell.node) {
              childrenElements.push(nodeReferencies[id + 1][c].element)
            }
          })
          const coords = []
          if (childrenElements.length) {
            childrenElements.forEach((ce) => {
              if (ce) {
                const domNode = ReactDOM.findDOMNode(ce)
                if (domNode)
                  coords.push({
                    x: domNode.offsetLeft,
                    y: domNode.offsetTop + domNode.offsetHeight / 2
                  })
              }
            })
            if (cardElement) {
              const x = cardElement.offsetWidth + cardElement.offsetLeft
              const center =
                cardElement.offsetTop + cardElement.offsetHeight / 2
              if (x !== 0 && !cardElement.classList.contains('add_card')) {
                // draw dots and path
                const svgContainer = document.createElement('div')
                svgContainer.setAttribute('class', styles.svg_container)
                const circle = document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  'svg'
                )
                const checkPoints = coords
                  .map((coord) => coord.y)
                  .concat(center)
                const height =
                  _.max(checkPoints) - _.min(checkPoints) >= 12
                    ? _.max(checkPoints) - _.min(checkPoints)
                    : 12
                circle.setAttribute('width', 160)
                circle.setAttribute('height', height)
                circle.setAttribute('viewBox', `0 0 160 ${height}`)
                circle.setAttribute('version', '1.1')
                circle.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
                let sourcePositionY = null
                if (Math.abs(_.min(checkPoints) - center) === height) {
                  sourcePositionY = height - 6
                } else if (Math.abs(_.min(checkPoints) - center) < 6) {
                  sourcePositionY = 6
                } else {
                  sourcePositionY = Math.abs(_.min(checkPoints) - center)
                }
                const lines = coords.map((coord) => {
                  const besie = `<path d="M 6, ${sourcePositionY} C 80, ${sourcePositionY}, 80, ${Math.abs(
                    coord.y - _.min(checkPoints)
                  )}, 160, ${Math.abs(
                    coord.y - _.min(checkPoints)
                  )}" stroke="#C4C4C4" fill="none"/>`
                  return besie
                })
                circle.innerHTML = `
                  ${lines.join('\n')}
                  ${
                    lines.length
                      ? `<circle cx="6" cy=${sourcePositionY} r="4" fill="#C4C4C4"/>`
                      : null
                  }
                `
                svgContainer.style.top = _.min(checkPoints) + 'px'
                svgContainer.style.left = x + 'px'
                svgContainer.appendChild(circle)
                pipelineContainer.appendChild(svgContainer)
              }
            }
          }
        }
      })
    })
  }

  componentDidMount() {
    this.drawCurves()
  }

  componentDidUpdate() {
    this.drawCurves()
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      ...TreeView.createColumnsData(props.tree)
    }
  }

  render() {
    const {
      nodeView,
      emptyNode,
      nodeViewClasses,
      emptyNodeProps,
      showEmptyNodes,
      ...props
    } = this.props
    const { nodeReferencies, columns } = this.state
    const NodeView = nodeView
    const EmptyNode = emptyNode
    return (
      <PanZoom {...props}>
        <div className={styles.tree} id='tree_wrapper'>
          {columns.map((col, i) => {
            return col.length ? (
              <div key={`id_${i}`} style={{ display: 'flex' }}>
                <div className={styles.tree__column}>
                  {col.map((item, idx) => {
                    return Object.keys(item).length > 3 ? (
                      <NodeView
                        ref={(el) => (nodeReferencies[i][idx].element = el)}
                        key={`node_${i}${idx}`}
                        id={`card_${i}${idx}`}
                        {...item}
                        styles={nodeViewClasses}
                      />
                    ) : showEmptyNodes ? (
                      <EmptyNode
                        ref={(el) => (nodeReferencies[i][idx].element = el)}
                        key={`node_${i}${idx}`}
                        styles={nodeViewClasses}
                        data={{
                          ...nodeReferencies[i][idx],
                          newTree: this.tree
                        }}
                        {...emptyNodeProps}
                      />
                    ) : null
                  })}
                </div>
              </div>
            ) : null
          })}
        </div>
      </PanZoom>
    )
  }
}

export default TreeView
