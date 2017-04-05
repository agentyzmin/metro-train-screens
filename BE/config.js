var route,
    fs = require('fs'),
    argv = process.argv,
    path = require('path');

try {
    route = fs.readFileSync('/home/a3/.a3/metro-line.txt', { encoding: 'UTF-8' }).trim();
} catch(err) {}

module.exports = {
    FE_DIR: path.join(__dirname, '../FE'),
    LOGFILE: path.join(__dirname, '../informer.log'),
    ROUTE: route || 'M1',
    SYS_DTMF_HANDLERS: {
        '0909': function () {
            var exec = require('child_process').exec;
            exec('sudo shutdown -h now');
        }
    },

    useDummyInformer: (argv && argv.indexOf('--dummy') !== -1)
};
