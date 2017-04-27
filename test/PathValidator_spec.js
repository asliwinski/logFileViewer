'use strict';

let assert = require('assert');
let PathValidator = require("../service/PathValidator");
const path = require('path');

describe('PathValidator', function () {

    describe('#PathValidator', function () {
        it("/var/log is allowed", function () {
            let pathValidator = new PathValidator('/var/log/someFile');
            assert(pathValidator.status);
        });
        it("returns false for /root", function () {
            let pathValidator = new PathValidator('/root');
            assert.equal(pathValidator.status, false);
            assert.equal(pathValidator.message, "Incorrect path, only /var/log/* allowed.");
        });
        it("returns false for empty string", function () {
            let pathValidator = new PathValidator('');
            assert.equal(pathValidator.status, false);
        });
        it("returns false for /var/log", function () {
            let pathValidator = new PathValidator('/var/log/');
            assert.equal(pathValidator.status, false);
            assert.equal(pathValidator.message, "No file specified.");
        });
    }); // isPathValid
});