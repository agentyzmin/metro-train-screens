"use strict";

var listeners = {},
    position = 0,
    codes = [
        '0106', '0107', '0108', '0109', '0200', '0201', '0203', '0204', '0205', '0206', '0207', '0208',
        '0209', '0300', '0301', '0302', '0304', '0305', '0306', '0307', '0308', '0309', '0400', '0401',
        '0402', '0403', '0405', '0406', '0407', '0408', '0409', '0500', '0501', '0502', '0503',

        '0503', '0500', '0501', '0408', '0409', '0406', '0407', '0403', '0405', '0401', '0402', '0309',
        '0400', '0308', '0309', '0306', '0307', '0305', '0306', '0302', '0304', '0300', '0301', '0208',
        '0209', '0206', '0207', '0204', '0205', '0201', '0203', '0109', '0200', '0107', '0108', '0105',
        '0106'
    ];

setInterval(function() {
    trigger('data', codes[position]);
    trigger('code', codes[position]);

    ++position;
    if (position === codes.length) {
        position = 0;
    }
}, 20 * 1000);

function addListener(event, cb) {
    if (!listeners[event]) {
        listeners[event] = [];
    }

    listeners[event].push(cb);
}

function trigger(event, data) {
    if (!listeners[event]) {
        return;
    }

    listeners[event].forEach(function(cb) {
        cb(data);
    });
}

module.exports.on = addListener;
