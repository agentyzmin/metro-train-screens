jQuery(function($) {
    "use strict";

    var DISPLAY_NEXT_STATIONS = 6;
    var NEXT_STATION_DURATION = 10 * 1000;

    var currentRoute = routes.m1;

    bindInformationalServer();

    function bindInformationalServer() {
        var timeout,
            previousKey;

        request();

        function request() {
            $
                .post('/get-action')
                .then(function(data) {
                    try {
                        data = JSON.parse(data);
                    } catch(e) {
                        console.log('JSON parse error');
                    }

                    if (data) {
                        onEvent(data);
                    }

                    setTimeout(request, 1000);
                })
                .catch(function() {
                    console.log('Lost connection to the server');
                    setTimeout(request, 1000);
                });
        }

        function onEvent(data) {
            var details, station, direction, previousKeyCopy;

            clearTimeout(timeout);

            switch (data.type) {
                case 'DTMF':
                    details = getKeyByDTMF(data.code);
                    station = details && currentRoute[details.key];

                    if (!details || !station) {
                        return;
                    }

                    if (details.type === 'current') {
                        previousKey = details.key;
                        new app.screens.StationDetails(station, false);
                    }
                    else if (details.type === 'next') {
                        new app.screens.StationDetails(station, true);

                        // Calculate direction and display next stations if success
                        if (previousKey && (details.key - previousKey === 1)) {
                            direction = 1;
                        } else if (previousKey && (details.key - previousKey === -1)) {
                            direction = -1;
                        } else {
                            direction = null;
                        }

                        previousKeyCopy = previousKey;
                        previousKey = null;

                        if (direction) {
                            timeout = setTimeout(function() {
                                new app.screens.StationsList(getNextStations(previousKeyCopy, direction));
                            }, NEXT_STATION_DURATION);
                        }
                    }
                    break;

                case 'nothing':
                    break;

                default:
                    console.log('Unknown type:', data.type);
            }
        }
    }

    function getNextStations(currentStationKey, currentDirection) {
        var method, i, index,
            time = 0,
            result = [],
            station = currentRoute[currentStationKey];

        method = currentDirection > 0 ? 'timeToNextStation' : 'timeToPreviousStation';
        time += station[method] ? station[method]() : 0;

        for (i = 0; i < DISPLAY_NEXT_STATIONS; ++i) {
            index = currentStationKey + (i + 1) * (currentDirection > 0 ? 1 : -1);
            station = currentRoute[index];

            if (station) {
                result.push({
                    name: station.name,
                    line: station.line,
                    transfer: station.transfer,
                    travelTime: time
                });

                time += station[method] ? station[method]() : 0;
                time += station.timeOnPlatform ? station.timeOnPlatform() : 0;
            } else {
                result.push(null);
            }
        }

        return result;
    }

    function getKeyByDTMF(code) {
        var i, item;

        code = code.toString();

        for (i = 0; i < currentRoute.length; ++i) {
            item = currentRoute[i];

            if (item.DTMF.current === code) {
                return {
                    key: i,
                    type: 'current'
                }
            }

            if (item.DTMF.next === code) {
                return {
                    key: i,
                    type: 'next'
                }
            }
        }

        return null;
    }
});