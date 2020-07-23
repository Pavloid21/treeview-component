import React from 'react'
import { BsPlusCircle } from 'react-icons/bs'

class EmptyNode extends React.Component {
    render() {
        return (
            <div {...this.props} onClick={(event) => this.props.onClick(event, this.props.data)}>
                <BsPlusCircle/>
            </div>
        )
    }
}

export default EmptyNode