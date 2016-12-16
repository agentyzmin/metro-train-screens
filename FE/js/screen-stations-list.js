(function() {
    "use strict";

    var TIME_UNIT = {
        ua: 'хв',
        en: 'min'
    };

    var $window, $body, $header, $stationDetails, $stationsList, inlineStationTmpl;

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
        $stationDetails = $('.b-station-details');
        $stationsList = $('.b-stations-list');
        inlineStationTmpl = doT.template($('#tmpl-inline-station').html());

        app.screens.StationsList = Screen;
    });

    function Screen(data) {
        var lang,
            that = this,
            intervals = [],
            timeouts = [];

        this.name = 'stations-list';
        this.stop = stop;
        init();

        function init() {
            var i, $transferOptions,
                previousScreen = app.screens.current;

            if (previousScreen) {
                previousScreen.stop();
            }

            app.screens.current = that;
            $body.addClass('b-screen_stations-list');

            // Header
            $header.html(inlineStationTmpl(data[0]));

            $transferOptions = $header.find('.b-transfer-options');
            $transferOptions.css('margin-top', '-150px');

            addTimeout(function() {
                $transferOptions.css('margin-top', '');
            }, 100);

            // Content
            $stationsList.show().empty();
            for (i = 1; i < data.length; ++i) {
                (function(i) {
                    var $transferOptions,
                        station = data[i],
                        $html = $('<div class="b-stations-list__line"></div>');

                    if (station) {
                        $html.html(inlineStationTmpl(station));
                        $transferOptions = $html.find('.b-transfer-options');

                        $html.css({ top: 0, height: '100%' });
                        $transferOptions.css('margin-top', '-150px');

                        addTimeout(function() {
                            $html.css({ top: '', height: '' });
                            $transferOptions.css('margin-top', '');
                        }, 1);
                    }

                    $stationsList.append($html);
                    setNextStationWidth($html);
                } (i));
            }

            updateTexts();
            addInterval(function() {
                // Travel time decrease
                data.forEach(function(station) {
                    if (station) {
                        station.travelTime -= 5;
                    }
                });

                updateTexts();
            }, 5000);
        }

        function updateTexts() {
            var $line, name, time, station, i,
                $lines = $('.b-stations-list__line');

            lang = (lang === 'ua' ? 'en' : 'ua');

            // Header
            time = data[0].travelTime > 60 ? Math.ceil(data[0].travelTime / 60) : 1;
            name = data[0].name[lang];

            $header
                .find('.b-inline-station__time-left')
                .scrollText(time + ' ' + TIME_UNIT[lang]);
            $header
                .find('.b-inline-station__name')
                .scrollText(name);

            // Content
            for (i = 1; i < data.length; ++i) {
                station = data[i];

                if (station) {
                    time = station.travelTime > 60 ? Math.ceil(station.travelTime / 60) : 1;
                    name = station.name[lang];
                    $line = $($lines.get(i - 1));

                    $line
                        .find('.b-inline-station__name')
                        .scrollText(name);

                    $line
                        .find('.b-inline-station__time-left')
                        .scrollText(time + ' ' + TIME_UNIT[lang]);
                }
            }
        }

        function setNextStationWidth($row) {
            var $stationName = $row.find('.b-inline-station__name'),
                $transferOptions = $row.find('.b-transfer-options'),
                result = $row.width();

            result -= $transferOptions.width();
            result -= parseInt($transferOptions.css('right'));

            $stationName.css('max-width', result);
        }

        function stop() {
            intervals.forEach(clearInterval);
            timeouts.forEach(clearTimeout);

            intervals = [];
            timeouts = [];

            $body.removeClass('b-screen_stations-list');
        }

        function addTimeout(f, t) {
            timeouts.push(setTimeout(f, t));
        }

        function addInterval(f, t) {
            intervals.push(setInterval(f, t));
        }
    }
}());