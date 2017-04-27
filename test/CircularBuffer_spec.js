'use strict';

let assert = require('assert');
let CircularBuffer = require("../service/CircularBuffer");
const fs = require('fs');
const readline = require('readline');

describe('CircularBuffer', function () {

    let cb;

    before(function () {
        cb = new CircularBuffer(10);
    });

    describe('#push', function () {
        it("buffer contains the pushed item", function () {
            const lineObject = {id: 2, text: 'lorem ipsum'};
            cb.push(lineObject);
            assert.deepEqual(lineObject, cb._buffer[0]);
        });
        it("head gets incremented", function () {
            assert.deepEqual(cb._head, 1);
        });
    }); // push

    describe('#getBuffer', function () {
        it("getBuffer returns correct JSON object", function () {
            cb.push({
                id: 3,
                text: 'Aenean vitae metus sagittis leo porta volutpat vel nec lorem. Integer a libero sodales nibh egestas lacinia. '
            });
            cb.push({
                id: 4,
                text: 'Maecenas egestas, felis a placerat luctus, tortor mi commodo tellus, in feugiat tortor justo vel mauris. '
            });
            assert.deepEqual(cb.getBuffer(), [{id: 2, text: 'lorem ipsum'},
                {
                    id: 3,
                    text: 'Aenean vitae metus sagittis leo porta volutpat vel nec lorem. Integer a libero sodales nibh egestas lacinia. '
                },
                {
                    id: 4,
                    text: 'Maecenas egestas, felis a placerat luctus, tortor mi commodo tellus, in feugiat tortor justo vel mauris. '
                }]);
        });
    }); // getBuffer
});