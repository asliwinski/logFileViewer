'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const QueryFile = require('../service/QueryFile');

/** Required page size */
const WINDOW_SIZE = require('./constants').WINDOW_SIZE;

app.use(cors())
    .use(express.static(path.resolve(__dirname, '..', 'build')));

/** Instantiates an object of QueryFile class, passes parameters, passes received data to response object */
app.get('/api', (req, res) => {

    let path = req.query.path.trim();
    let skip = parseInt(req.query.skip.trim());

    let queryFile = new QueryFile(path, skip, WINDOW_SIZE);
    queryFile.runQuery(returnData);

    /**
     * Callback to return a response.
     *
     * @callback returnData
     * @param {string} data - Response string.
     * @param {int} status - Status (0 : OK, -1 : error).
     */
    function returnData(data, status) {
        if (status === 0) {
            res.send(data);
        } else {
            res.status(400).send(data);
        }
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;