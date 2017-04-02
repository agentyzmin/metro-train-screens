"use strict";

const config = require('./config');

var express = require('express'),
    fs = require('fs'),
    informer = config.useDummyInformer ? require('./dummy-informer') : require('./informer'),
    app = express();

var nextAction;

app.use('/', express.static(config.FE_DIR));

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

informer.on('code', function(code) {
    if (config.SYS_DTMF_HANDLERS[code]) {
        return config.SYS_DTMF_HANDLERS[code]();
    }

    nextAction = {
        type: 'DTMF',
        code: code
    };
});

informer.on('data', function(data) {
    var ts = new Date().getTime();

    fs.appendFile(config.LOGFILE, ts + '::M1::' + data + "\n");
});
