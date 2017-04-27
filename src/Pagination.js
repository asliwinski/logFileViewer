import React, { Component } from 'react'

/** Class representing the placeholder window */
class Pagination extends Component {

    /**
     * Create the component object, set initial state, bind the click event handler.
     */
    constructor() {
        super();
        this.state = {
            value: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Handle the button click event.
     * Call the App.move method
     * @param {string} direction - The string containing the navigation direction.
     * @param {Event} event - The click event.
     */
    handleClick (direction, event) {
        event.preventDefault();
        this.props.move(direction);
    }

    /**
     * Render the component.
     * Bind onClick handlers.
     */
    render() {
        const first = this.handleClick.bind(this, 'first');
        const previous = this.handleClick.bind(this, 'previous');
        const next = this.handleClick.bind(this, 'next');
        const last = this.handleClick.bind(this, 'last');

        return (<div className="row">
                    <div className="col-lg-12">
                        <nav className="text-center">
                            <ul className="pagination">
                                <li>
                                    <a href="#" onClick={first}><span>&laquo;</span></a>
                                </li>
                                <li>
                                    <a href="#" onClick={previous}><span>&lsaquo;</span></a>
                                </li>
                                <li>
                                    <a href="#" onClick={next}><span>&rsaquo;</span></a>
                                </li>
                                <li>
                                    <a href="#" onClick={last}><span>&raquo;</span></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>)
    }
}

export default Pagination