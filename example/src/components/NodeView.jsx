import React from 'react'

class NodeView extends React.Component {
    render() {
        const { title, description, styles, id } = this.props
        return(
            <div className={styles.view} id={id}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        )
    }
}

export default NodeView
