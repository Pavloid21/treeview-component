import TreeView from './index'
import NodeView from '../example/src/components/NodeView'
import EmptyNode from '../example/src/components/EmptyNode'
import React from 'react'
import styles from './styles.module.css'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import { unmountComponentAtNode } from 'react-dom'

configure({ adapter: new Adapter() })

jest.mock('../example/src/components/NodeView')
jest.mock('../example/src/components/EmptyNode')

let container = null
const props = {
  autoCenter: true,
  nodeView: NodeView,
  nodeViewClasses: styles,
  showEmptyNodes: true,
  emptyNode: EmptyNode,
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
  },
  style: {
    cursor: 'auto',
    outline: 'none'
  }
}

const mock = (el) => {
  console.log('el', el)
  return el
}

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  const wrapper = shallow(<TreeView />)
  const instance = wrapper.instance()
  const addCard = instance.addCard
  props.emptyNodeProps = {}
  props.emptyNodeProps.onClick = addCard
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('TreeView Component', () => {
  it('createColumnsData', () => {
    const data = TreeView.createColumnsData()
    expect(data.columns).toBeInstanceOf(Array)
    expect(data.nodeReferencies).toBeInstanceOf(Array)
  })

  it('setRef', () => {
    const wrapper = shallow(<TreeView {...props} />)
    wrapper.find(NodeView).forEach((item) => {
      item.getElement().ref(jest.fn(mock))
    })
    wrapper.find(EmptyNode).forEach((item) => {
      item.getElement().ref(jest.fn(mock))
    })
  })

  it('drawCurves', () => {
    const wrapper = mount(<TreeView {...props} />)
    wrapper.find(NodeView).forEach((item) => {
      item.getElement().ref(item.getElement())
    })
    wrapper.find(EmptyNode).forEach((item) => {
      item.getElement().ref(item.getElement())
    })
    expect(wrapper.find('#tree_wrapper')).toHaveLength(1)
  })
})
