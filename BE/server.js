"use strict";

var argv = process.argv,
    informer = (argv && argv.indexOf('--dummy') === -1) ? require('./informer') : require('./dummy-informer'),
    express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    FE_DIR = path.join(__dirname, '../FE');

var nextAction;

app.use('/', express.static(FE_DIR));

app.post('/get-action', function (req, res) {
    var start = new Date().getTime();
    waitForAction();

    function waitForAction() {
        var ts = new Date().getTime();

        // Do not keep requests open for more than a minute
        if (!nextAction && (ts - start > 60 * 1000)) {
            nextAction = { type: 'nothing' };
        }

        if (nextAction) {
            res.send(JSON.stringify(nextAction));
            nextAction = null;
        } else {
            setTimeout(waitForAction, 25);
        }
    }
});

app.listen(7777, '127.0.0.1');

informer.on('code', function(data) {
    nextAction = {
        type: 'DTMF',
        code: data
    };
});

informer.on('data', function(data) {
    var file = path.join(__dirname, '../informer.log'),
        ts = new Date().getTime();

    fs.appendFile(file, ts + '::M1::' + data + "\n");
});