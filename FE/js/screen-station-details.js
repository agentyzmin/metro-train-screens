(function() {
    "use strict";

    var HIDE_PREVIOUS_STATION_DURATION = 500; // Check b-station-details.less before update!
    var NEXT_STATION = {
        ua: 'Наступна станція',
        en: 'Next station'
    };
    var CURRENT_STATION = {
        ua: 'Станція',
        en: 'This station is'
    };
    var END_STATION_NOTIFICATION = {
        ua: ['Поїзд далі не їде', 'Не залишайте своїх речей'],
        en: ['This train terminates here', 'Don\'t forget your belongings']
    };
    var EXIT_RIGHT_NOTIFICATION = {
        ua: 'Платформа праворуч',
        en: 'Platform on the right'
    };

    var $window, $body, $header, $stationDetails, $stationsList, stationDetailTmpl, transferTmpl;

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
        stationDetailTmpl = doT.template($('#tmpl-station-details').html());
        transferTmpl = doT.template($('#tmpl-station-details-transfer').html());

        app.screens.StationDetails = Screen;
    });

    function Screen(station, options) {
        var $stationTitle, $stationName1, $stationName2, $endLine1, $endLine2, $exitMessage,
            lang = 'ua',
            transferScreens = [],
            transferScreen = 0,
            that = this,
            intervals = [],
            timeouts = [];

        options = options || {};
        this.name = 'station-details';
        this.stop = stop;
        cleanAndInit();

        function cleanAndInit() {
            var $detailsHeader, $detailsFooter, windowHeight,
                previousScreen = app.screens.current;

            if (previousScreen) {
                previousScreen.stop();
            }

            if (previousScreen && previousScreen.name !== that.name) {
                $stationsList.empty().hide();
                $header.empty();

                $stationDetails.show();
            }

            app.screens.current = that;
            $body.addClass('b-screen_station-details');

            // Screen change animation
            if (previousScreen && previousScreen.name === that.name) {
                $detailsHeader = $('.b-station-details__header');
                $detailsFooter = $('.b-station-details__footer');
                windowHeight = $window.height();

                $detailsHeader
                    .addClass('animate')
                    .css('top', windowHeight);

                $detailsFooter
                    .addClass('animate')
                    .css('bottom', -1 * (windowHeight - $detailsFooter.height()));

                addTimeout(function () {
                    $detailsHeader
                        .css('top', '')
                        .removeClass('animate');

                    $detailsHeader
                        .css('bottom', '')
                        .removeClass('animate');

                    init();
                }, HIDE_PREVIOUS_STATION_DURATION);

            } else {
                init();
            }
        }

        function init() {
            var params = $.extend({ isEnd: options.isEnd }, station);

            $stationDetails.html(stationDetailTmpl(params));
            $stationTitle = $stationDetails.find('.b-station-details__station-title');
            $stationName1 = $stationDetails.find('.b-station-details__station-name-1');
            $stationName2 = $stationDetails.find('.b-station-details__station-name-2');

            // Transform transfer screen object into array
            if (station.transfer) {
                Object.keys(station.transfer).forEach(function(type) {
                    var option = $.extend({ type: type }, station.transfer[type]),
                        screen = option.screen || 1;

                    transferScreens[screen] = transferScreens[screen] || [];
                    transferScreens[screen].push(option);
                });

                transferScreens = transferScreens.filter(function(screen) {
                    return screen && screen.length;
                });
            }

            if (station.exit === 'right') {
                $exitMessage = $stationDetails.find('.b-station-details__exit-message');
            }

            if (options.isEnd) {
                $endLine1 = $stationDetails.find('.b-station-details__end-line-1');
                $endLine2 = $stationDetails.find('.b-station-details__end-line-2');
            }

            updateTexts(true);
            addInterval(updateTexts, 5000);
        }

        function updateTexts(isFirstUpdate) {
            var title, line1, line2, transferTitles, transferNames,
                isNext = options.isNext;

            // Station name
            if (transferScreen === 0) {
                if (isNext) {
                    title = NEXT_STATION[lang];
                } else {
                    title = CURRENT_STATION[lang];
                }

                line1 = station.name[lang].split(' ')[0];
                line2 = station.name[lang].split(' ')[1];

                $stationTitle.scrollText(title);
                $stationName1.scrollText(line1);

                if (line2) {
                    $stationName2.scrollText(line2);
                }
            }

            // Transfer options
            if (transferScreens.length) {
                if ((transferScreens.length === 1 && isFirstUpdate) || transferScreens.length > 1) {
                    $stationDetails
                        .find('.b-station-details__transfer')
                        .replaceWith(transferTmpl(transferScreens[transferScreen]));
                }

                transferTitles = $stationDetails.find('.b-station-details__transfer-title');
                transferNames = $stationDetails.find('.b-station-details__transfer-name');

                transferScreens[transferScreen].forEach(function(transferOption, i) {
                    if (transferOption[lang].length === 1) {
                        $(transferTitles.get(i)).hide();
                        $(transferNames.get(i)).scrollText(transferOption[lang][0]);
                    } else {
                        $(transferTitles.get(i)).show().scrollText(transferOption[lang][0]);
                        $(transferNames.get(i)).scrollText(transferOption[lang][1]);
                    }
                });

                if (transferScreen === transferScreens.length - 1) {
                    transferScreen = 0;
                    lang = (lang === 'ua' ? 'en' : 'ua');
                } else {
                    ++transferScreen;
                }
            }

            // Additional information texts
            if (station.exit === 'right' && transferScreen === 0) {
                $exitMessage.scrollText(EXIT_RIGHT_NOTIFICATION[lang]);
            }

            if (options.isEnd && transferScreen === 0) {
                line1 = END_STATION_NOTIFICATION[lang][0];
                line2 = END_STATION_NOTIFICATION[lang][1];

                $endLine1.scrollText(line1);
                $endLine2.scrollText(line2);
            }
        }

        function stop() {
            intervals.forEach(clearInterval);
            timeouts.forEach(clearTimeout);

            intervals = [];
            timeouts = [];

            $body.removeClass('b-screen_station-details');
        }

        function addTimeout(f, t) {
            timeouts.push(setTimeout(f, t));
        }

        function addInterval(f, t) {
            intervals.push(setInterval(f, t));
        }
    }
}());