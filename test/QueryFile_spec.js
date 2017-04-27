'use strict';

let assert = require('assert');
let QueryFile = require("../service/QueryFile");
const fs = require('fs');
const path = require('path');


describe('QueryFile', function () {

    let qf,
        testCallback,
        rl,
        countLines = 0,
        testStream;

    before(function () {
        qf = new QueryFile('/var/log/test', 10, 10, testCallback);
        testStream = fs.createReadStream(path.join("./test", "testFile"));
    });

    describe('#saveLine', function () {
        it("countLines gets incremented", function () {
            qf.saveLine('line of text', rl);
            assert(qf.countLines === 1);
        });
        it("buffer size equals 10", function () {
            assert.deepEqual(qf.buffer.size, 10);
        });
        it("buffer contains the given line of text", function () {
            let line = {id: 1, text: 'line of text'};
            assert.deepEqual(qf.buffer.buffer[0], line);
        });
    }); // saveLine

    describe('#processFile', function () {
        it("file is properly processed", function (done) {
            let qf = new QueryFile('', 10, 10);
            qf.processFile(testStream, cb);

            function cb(data, status) {
                if (status === 0) {
                    assert.equal(data[0].id, 11);
                    assert.equal(data[data.length - 1].id, 20);

                    assert.equal(data[0].text, 'Mar 05 14:14:42 Vestibulum condimentum sit amet nulla sed lacinia.');
                    assert.equal(data[data.length - 1].text, 'Mar 05 14:14:45 Duis ipsum risus, feugiat non risus a, finibus consequat dui.');

                } else {
                    console.log("data: " + data);
                    throw new Error('#processFile error');
                }
                done();
            }
        });
        it("buffer correctly returns the end of file (last chunk)", function (done) {
            let qf = new QueryFile('', -1, 10);
            let testStream = fs.createReadStream(path.join("./test", "testFile"));
            qf.processFile(testStream, cb);

            function cb(data, status) {
                if (status === 0) {
                    assert.equal(data[0].id, 17);
                    assert.equal(data[data.length - 1].id, 26);

                    assert.equal(data[0].text, 'Mar 05 14:14:44 In eleifend hendrerit velit, eget tincidunt ex lacinia in.');
                    assert.equal(data[data.length - 1].text, 'Mar 18 22:27:29 Proin non sapien a lacus euismod pellentesque eget vel lorem.');

                } else {
                    console.log("data: " + data);
                    throw new Error('#processFile error');
                }
                done();
            }
        });
        it("correctly reports nonexisting file", function (done) {
            let qf = new QueryFile('', -1, 10);
            let testStream = fs.createReadStream(path.join("./test", "testFileNonExisting"));
            qf.processFile(testStream, cb);

            function cb(data, status) {
                assert.throws(
                    () => {
                        if (status === 0) {

                        } else {
                            throw new Error('#processFile error');
                        }
                    }, Error
                );
                done();
            }
        });
    }); // processFile
});