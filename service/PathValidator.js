'use strict';

/** Class representing a file validator */
module.exports = class PathValidator {
    /**
     * Create a validator, validate a path.
     * @param {string} pathString - A string containing a path to a file.
     */
    constructor(pathString) {
        this._pathString = pathString;
        this._relativePath = this._pathString.split(/\/var\/log\/(.+)/)[1];

        if (typeof this._relativePath === 'undefined') {
            if (this._pathString.indexOf('/var/log/') === 0) {
                    this._status = false;
                    this._message = "No file specified.";
            } else {
                    this._status = false;
                    this._message = "Incorrect path, only /var/log/* allowed.";
            }
        } else {
                this._status = true;
        }
    }

    /**
     * Get the validation status.
     * @return {boolean} Validation status.
     */
    get status() {
        return this._status;
    }

    /**
     * Get the buffer object.
     * @return {string} Validation error message.
     */
    get message() {
        return this._message;
    }
};