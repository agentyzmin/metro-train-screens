var argv = process.argv,
    path = require('path');

module.exports = {
    FE_DIR: path.join(__dirname, '../FE'),
    LOGFILE: path.join(__dirname, '../informer.log'),
    SYS_DTMF_HANDLERS: {
        '0909': function () {
            var exec = require('child_process').exec;
            exec('sudo shutdown -h now');
        }
    },

    useDummyInformer: (argv && argv.indexOf('--dummy') !== -1)
};
