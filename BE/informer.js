"use strict";

var PORT = '/dev/ttyS0';

var SerialPort = require('serialport'),
    path = require('path'),
    listeners = {};

openPort();

function openPort() {
    var port = new SerialPort(PORT, {
        baudRate: 9600
    });

    port.on('open', function() {
        debug('Port opened: ' + PORT);
    });

    port.on('error', function(err) {
        debug('Port open error: : ' + err.message);
    });

    port.on('data', function(data) {
        data = data.toString();
        debug('Receive data: ' + data);
        trigger('data', data);
        trigger('code', data.substr(0,4));
    });
}

function debug(message) {
    console.log(new Date(), message);
}

function addListener(event, cb) {
    if (!listeners[event]) {
        listeners[event] = [];
    }

    listeners[event].push(cb);
}

function trigger(event, data) {
    debug('Triggered: ' + event + ' ' + data);

    if (!listeners[event]) {
        return;
    }

    listeners[event].forEach(function(cb) {
        cb(data);
    });
}

module.exports.on = addListener;
