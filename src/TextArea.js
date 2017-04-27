import React, { Component } from 'react';
import TextRow from './TextRow';
import Spinner from 'react-spinner';

/** Class representing the placeholder window */
class TextArea extends Component {

    /**
     * Render the component.
     * Pass data to TextRow component.
     * Toggle throbber.
     */
    renderRows() {
        let rows = [];
        this.props.lines.forEach((line) => {
            rows.push(<TextRow line={line.text} key={line.id} id={line.id}/>);
        });

        let throbber = this.props.throbber ? <Spinner /> : '';

        return (<div className="row text">
                <div className="well text-left col-lg-12">
                    {throbber}
                    {rows}
                </div>
            </div>
        )
    }

    /**
     * Render the error message passed from the App component.
     */
    renderError() {
        return (<div className="row text">
                    <div className="well text-left col-lg-12" style={{'border': '1px solid #a94442'}} >
                        <p>{this.props.error.msg}</p>
                    </div>
                </div>
        )
    }

    /**
     * Call the relevant render method based on error flag passed from App component.
     */
    render() {

        return this.props.error.flag ? this.renderError() : this.renderRows();
    }
}

export default TextArea