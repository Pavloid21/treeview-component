import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'
import { PanZoom } from 'react-easy-panzoom'
import _ from 'lodash'

class TreeView extends React.Component {
  constructor(props) {
    super(props)
    this.tree = props.tree
    this.nodeView = props.nodeView
    this.columns = []
    this.nodeReferencies = []
  }

  state = {
    columns: []
  }

  createColumnsData = (tree) => {
    this.columns = []
    this.nodeReferencies = []
    const treeWalker = (tree, column = 0, parent = null) => {
      if (!this.columns[column]) {
        this.columns.push([])
        this.nodeReferencies.push([])
      }
      if (!this.columns[column + 1]) {
        this.columns.push([])
        this.nodeReferencies.push([])
      }
      if (tree === null) {
        const obj = {
          children: [],
          parent_node: parent ? parent.node : null,
          node: `${column}${this.columns[column].length}`
        }
        tree = obj
        this.columns[column].push(obj)
        this.nodeReferencies[column].push({
          parent_node: parent ? parent.node : null
        })
        return undefined
      }
      tree.parent_node = parent ? parent.node : null
      tree.node = `${column}${this.columns[column].length}`
      this.columns[column].push(tree)
      this.nodeReferencies[column].push({
        parent_node: parent ? parent.node : null
      })
      tree.children.forEach((child) => {
        treeWalker(child, column + 1, tree)
      })
    }
    treeWalker(tree)
    const data = this.columns
    return data
  }

  drawCurves = () => {
    document.querySelectorAll('.svg_container').forEach((e) => e.remove())
    const pipelineContainer = document.getElementById('tree_wrapper')
    this.state.columns.forEach((column, id) => {
      column.forEach((cell, index) => {
        if (id !== this.state.columns.length - 1) {
          const cardElement = ReactDOM.findDOMNode(
            this.nodeReferencies[id][index].element
          )
          const childrenElements = []
          this.state.columns[id + 1].map((child, c) => {
            if (child && child.parent_node === cell.node) {
              childrenElements.push(this.nodeReferencies[id + 1][c].element)
            }
          })
          const coords = []
          if (childrenElements.length) {
            childrenElements.forEach((ce) => {
              if (ce) {
                const domNode = ReactDOM.findDOMNode(ce)
                coords.push({
                  x: domNode.offsetLeft,
                  y: domNode.offsetTop + domNode.offsetHeight / 2
                })
              }
            })
            if (cardElement) {
              const x = cardElement.offsetWidth + cardElement.offsetLeft
              const y = cardElement.offsetTop
              const center =
                cardElement.offsetTop + cardElement.offsetHeight / 2
              if (
                x !== 0 &&
                y !== 0 &&
                !cardElement.classList.contains('add_card')
              ) {
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

  componentWillMount() {
    const newColumns = this.createColumnsData(this.props.tree)
    console.log('MOUNTED:>> ')
    this.setState({
      columns: newColumns
    })
  }

  componentDidMount() {
    this.drawCurves()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('JSON.stringify(prevProps.tree) :>> ', JSON.stringify(prevProps.tree), JSON.stringify(this.props.tree));
    if (JSON.stringify(prevProps.tree) !== JSON.stringify(this.props.tree)) {
      console.log('prevProps :>> ', prevProps.tree)
      const newColumns = this.createColumnsData(this.props.tree)
      this.setState({
        columns: newColumns
      })
    }
  }

  render() {
    const NodeView = this.props.nodeView
    const EmptyNode = this.props.emptyNode
    const { nodeViewClasses, showEmptyNodes, emptyNodeProps } = this.props
    return (
      <PanZoom {...this.props}>
        <div className={styles.tree} id='tree_wrapper'>
          {this.state.columns.map((col, i) => {
            return col.length ? (
              <div style={{ display: 'flex' }}>
                <div key={i} className={styles.tree__column}>
                  {col.map((item, idx) => {
                    return Object.keys(item).length > 3 ? (
                      <NodeView
                        ref={(el) =>
                          (this.nodeReferencies[i][idx].element = el)
                        }
                        id={`card_${i}${idx}`}
                        {...item}
                        styles={nodeViewClasses}
                      />
                    ) : showEmptyNodes ? (
                      <EmptyNode
                        ref={(el) =>
                          (this.nodeReferencies[i][idx].element = el)
                        }
                        styles={nodeViewClasses}
                        data={{
                          ...this.nodeReferencies[i][idx],
                          index: idx
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
