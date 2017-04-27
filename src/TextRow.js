import React, { Component } from 'react';

/** Class representing the component consisting of a single line of text */
class TextRow extends Component {

    /**
     * Render the component using data passed from TextArea component.
     */
    render() {
        return (
            <p>
                <span className="small">{this.props.id}. </span>
                {this.props.line}
            </p>
        );
    }
}

export default TextRow