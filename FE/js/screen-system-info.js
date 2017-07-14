(function() {
    "use strict";

    var $window, $body, $header, systemInfoTmpl, systemInfo;

    if (!window.app) {
        window.app = {};
    }

    if (!app.screens) {
        app.screens = {};
    }

    jQuery(function($) {
        $window = $(window);
        $body = $('body');
        $header = $('.b-header');
        systemInfoTmpl = doT.template($('#tmpl-system-info').html());
        systemInfo = $('.b-system-info');

        app.screens.SystemInfo = Screen;
    });

    function Screen() {
        var interval;

        app.screens.current = this;
        interval = setInterval(update, 1000);
        update();

        this.stop = function() {
            clearInterval(interval);
        }
    }

    function update() {
        var date = new Date();

        systemInfo.html(systemInfoTmpl({
            date: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getUTCFullYear(),
            time: date.getHours() + ':' + date.getMinutes()
        }));
    }
}());
