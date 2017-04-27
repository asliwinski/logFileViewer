import React, { Component } from 'react';

/** Class representing the input field (View) */
class InputField extends Component {

    /**
     * Create the field, set initial state, bind handlers.
     */
    constructor() {
        super();
        this.state = {
            value: '',
            error: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Handle change of input field value.
     * @param {Event} event Object.
     */
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    /**
     * Handle change of input field value.
     * @param {Event} event - The click event.
     */
    handleSubmit(event) {
        event.preventDefault();
        const path = this.state.value;
        if (path.length !== 0) {
            this.setState({error: false});
            this.props.submit(path,0);
        } else {
            console.log("empty path");
            this.setState({error: true})
        }
    }

    /**
     * Render the input form.
     * The input is highlighted as incorrect in case either this.state.error or this props.error is true.
     * The onSubmit and onChange events are handled by relevant methods.
     */
    render() {
        let classNameInput = "form-group col-xs-10" + (this.state.error || this.props.error ? " has-error" : "");
        return (<div className="row">
            <div className="col-xs-12">
                <form onSubmit={this.handleSubmit} className="form-inline">
                    <div className="row input">
                        <div className={classNameInput}>
                            <input value={this.state.value}
                                   onChange={this.handleChange}
                                   type="text"
                                   style={{"width" : "100%"}}
                                   className="form-control"
                                   id="pathToFile2"
                                   placeholder="/path/to/file"
                            />
                        </div>
                        <button type="submit" className="btn btn-default col-xs-2">View</button>
                    </div>
                </form>
            </div>
        </div>)
    }
}

export default InputField