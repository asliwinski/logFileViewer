'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const CircularBuffer = require('./CircularBuffer');
const PathValidator = require('./PathValidator');

/** Class representing a file query */
module.exports = class QueryFile {
    /**
     * Create a query.
     * @param {string} pathString - A string containing a path to a file.
     * @param {int} skip - A string containing a number of lines to skip.
     * @param {int} WINDOW_SIZE - How many lines to return.
     */
    constructor(pathString, skip, WINDOW_SIZE) {
        this._pathString = pathString;
        this._relativePath = this._pathString.split(/\/var\/log\/(.+)/)[1];
        this._skipLines = skip;
        this._WINDOW_SIZE = WINDOW_SIZE;
        this._buffer = new CircularBuffer(this._WINDOW_SIZE);
        this._countLines = 0;
    }

    /**
     * Get the buffer object.
     * @return {object} A buffer object.
     */
    get buffer() {
        return this._buffer;
    }

    /**
     * Get the buffer object.
     * @return {int} Integer representing the number of lines traversed by query.
     */
    get countLines() {
        return this._countLines;
    }

    /**
     * Increment the text line counter.
     * Save the text line to the buffer object.
     * Close the readline interface if the number of lines buffered equals WINDOW_SIZE
     * @param {string} line - Object representing a line.
     * @param {Interface} rl - Readline interface.
     */
    saveLine(line, rl) {
        this._countLines++;
        const lineObject = {id: this._countLines, text: line};
        this._buffer.push(lineObject);

        if (this._skipLines > -1) {
            if (this._countLines === this._skipLines + this._WINDOW_SIZE) {
                rl.close();
            }
        }
    }

    /**
     * Process the file.
     * Create the readable file stream and consume it using readline interface.
     * Call returnData on 'close' event.
     * * @param {stream} stream - Readable stream of the file.
     * * @param {callback} returnData - Method to be called after the file is processed.
     */
    processFile(stream, returnData) {

        stream.on('error', (error) => {
            returnData(error.message, -1);
        });

        let rl = readline.createInterface({
            input: stream
        });

        rl.on('line', (line) => {
            this.saveLine(line, rl);
        });

        rl.on('close', () => {
            returnData(this._buffer.getBuffer(), 0);
        });
    }

    /**
     * Main method.
     * Check if the path is correct using PathValidator object.
     * Create a readable stream of file and call processFile.
     * @param {callback} returnData - Method to be called after the file is processed.
     */
    runQuery(returnData) {
        let pathValidator = new PathValidator(this._pathString);

        if (pathValidator.status) {

            const stream = fs.createReadStream(path.normalize(this._pathString));
            this.processFile(stream, returnData);

        } else {
            returnData(pathValidator.message, -1);
        }
    }
};