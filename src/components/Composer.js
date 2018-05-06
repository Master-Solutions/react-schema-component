import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Composer extends Component {

    constructor(props) {
        super(props);
        this.schema = this.props.schema;
    }

    renderNode(node) {
        const NodeComponent = this.schema.types[node.type].component;
        const children = node.children || [];
        return (
            <NodeComponent key={node.id} {...node.props}>
                {children.map(this.renderNode.bind(this))}
            </NodeComponent>
        )
    }

    render() {
        return this.renderNode(this.props.value);
    }
}

export default Composer;








