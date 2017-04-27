'use strict';

/** Class providing a fixed-size buffer window for file scanning */
module.exports = class CircularBuffer {
    /**
     * Create a buffer of given size.
     * @param {int} size - Size of the window.
     */
    constructor(size) {
        this._size = size;
        this._buffer = [];
        this._head = 0;
        //this._push = push.bind(this);
        //this._getBuffer = getBuffer.bind(this);
        //let _thisRef = this;
    }

    /**
     * Get the size of the window.
     * @return {int} Size of the window.
     */
    get size() {
        return this._size;
    }

    /**
     * Get the buffer array.
     * @return {Array} Buffer array.
     */
    get buffer() {
        return this._buffer;
    }

    /**
     * Get the buffer head position.
     * @return {int} Buffer head position.
     */
    get head() {
        return this._head;
    }

    /**
     * Push an object to the buffer based on the buffer's head pointer position.
     * Increment the buffer pointer.
     * @param {object} object - Object representing a line.
     */
    push(object) {
        this._buffer[this._head] = object;
        this._head++;
        if ((this._head) > this._size - 1) this._head = 0;
    }

    /**
     * Return the buffer ordered in FIFO manner.
     * @return {Array} array - an array representing the buffer.
     */
    getBuffer() {
        /** if already ordered or special case when the number of lines in a file is smaller than window size */
        if (this._head === 0 || this._buffer.length < this._size) {
            return this._buffer;
        } else {
            /** not ordered, let's copy the array applying the correct order */
            let array = [];
            this._buffer.forEach(() => {
                array.push(this._buffer[this._head]);
                this._head++;
                if ((this._head) > this._size - 1) this._head = 0;
            });
            return array;
        }
    }
};