var route,
    fs = require('fs'),
    argv = process.argv,
    path = require('path');

function getArgumentValue(key) {
    if (!argv) {
        return null;
    }

    for (var i in argv) {
        var value = argv[i];

        if (value.substr(0, key.length+1) === key + '=') {
            return argv[i].substr(key.length+1);
        }

        if (value === key) {
            return true;
        }
    }
}

function detectRoute() {
    var argRoute = getArgumentValue('--route');

    if (argRoute !== null) {
        return argRoute;
    }

    try {
        return fs.readFileSync('/home/a3/.a3/metro-line.txt', { encoding: 'UTF-8' }).trim();
    } catch(err) {}
}

function detectPort() {
    var argPort = getArgumentValue('--port');

    if (argPort !== null) {
        return argPort;
    }
}

module.exports = {
    FE_DIR: path.join(__dirname, '../FE'),
    LOGFILE: path.join(__dirname, '../informer.log'),
    ROUTE: detectRoute() || 'M1',
    INFORMER_PORT: detectPort() || '/dev/ttyS0',
    SYS_DTMF_HANDLERS: {
        '0909': function () {
            var exec = require('child_process').exec;
            exec('sudo shutdown -h now');
        }
    },

    useDummyInformer: (argv && argv.indexOf('--dummy') !== -1)
};
