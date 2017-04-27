import React, {Component} from 'react';
import '../node_modules/react-spinner/react-spinner.css'
import './App.css';
import Pagination from './Pagination';
import InputField from './InputField';
import TextArea from './TextArea';
const API = require('./helper/API');

/** Required page size */
const WINDOW_SIZE = require('../server/constants').WINDOW_SIZE;

/** Main app class representing the root level component */
class App extends Component {

    /**
     * Create the component object, set initial state, bind handlers and other methods.
     */
    constructor() {
        super();
        this.state = {
            page: [],
            skip: 0,
            error: false,
            path: '',
            throbber : false
        };
        this.logListingError = {flag: this.state.error, msg: ""};
        this.move = this.move.bind(this);
        this.submitPath = this.submitPath.bind(this);
        this.endpoint = '/api';
    }

    /**
     * Handle the navigation (pagination) component events and evaluate the skip parameter.
     * @param {string} direction - The string containing the navigation direction.
     */
    move(direction) {
        if (this.state.page.length !== 0) {

            let skip = parseInt(this.state.skip, 10);
            switch (direction) {
                case 'first':
                    skip = 0;
                    break;
                case 'previous':
                    skip <= WINDOW_SIZE * 2 ? skip = 0 : skip -= WINDOW_SIZE * 2;
                    break;
                case 'last':
                    skip = -1;
                    break;
                default:
                    break;
            }
            this.submitPath(this.state.path, skip)
        } else {
            this.setState({error: true})
        }
    }

    /**
     * Initiate API call providing the path to a file and a number of lines to be skipped.
     * @param {string} path - The string containing a path to a file.
     * @param {int} skip - The integer containing the number of lines to be skipped.
     */
    submitPath(path, skip) {

        if (path.length !== 0) {
            this.setState({throbber: true});
            API.fetchLines.call(this,path,skip);
        } else {
            console.log("empty path");
            this.setState({error: true, throbber: false});
        }
    }

    /**
     * Render the main component.
     * Pass properties to child components.
     */
    render() {
        return (
            <div>
                <div className="App row">
                    <div className="App-header col-md-12">
                        <h2>Log File Viewer
                            <small>&nbsp; e.g. /var/log/cron</small>
                        </h2>
                    </div>
                </div>
                <InputField submit={this.submitPath} error={this.state.error}/>
                <TextArea lines={this.state.page} error={this.logListingError} throbber={this.state.throbber}/>
                <Pagination move={this.move}/>
            </div>
        )
    }
}

export default App;