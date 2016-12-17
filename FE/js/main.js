jQuery(function($) {
    "use strict";

    var DISPLAY_NEXT_STATIONS = 6;
    var NEXT_STATION_DURATION = 10 * 1000;

    var currentRoute = routes.m1;

    bindInformationalServer();

    function bindInformationalServer() {
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

                    request();
                })
                .catch(function() {
                    console.log('Lost connection to the server');
                    setTimeout(request, 1000);
                });
        }

        function onEvent(data) {
            switch (data.type) {
                case 'DTMF':
                    onDTMF(data.code);
                    break;

                case 'nothing':
                    break;

                default:
                    console.log('Unknown event type:', data.type);
            }
        }

        function onDTMF(code) {
            var direction, previousStationIndex,
                details = decodeDTMF(code);

            clearTimeout(onDTMF.timeout);

            if (!details) {
                return;
            }

            switch (details.type) {
                case 'currentStation':
                    onDTMF.previousStationIndex = details.stationIndex;
                    new app.screens.StationDetails(details.station, false);
                    break;

                case 'nextStation':
                    new app.screens.StationDetails(details.station, true);

                    // Calculate direction and display next stations (if success)
                    previousStationIndex = onDTMF.previousStationIndex;
                    onDTMF.previousStationIndex = null;

                    if (previousStationIndex && (details.stationIndex - previousStationIndex === 1)) {
                        direction = 1;
                    } else if (previousStationIndex && (details.stationIndex - previousStationIndex === -1)) {
                        direction = -1;
                    } else {
                        direction = null;
                    }

                    if (direction) {
                        onDTMF.timeout = setTimeout(function() {
                            new app.screens.StationsList(getNextStations(previousStationIndex, direction));
                        }, NEXT_STATION_DURATION);
                    }
                    break;
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

    function decodeDTMF(code) {
        var i, item;

        code = code.toString();

        for (i = 0; i < currentRoute.length; ++i) {
            item = currentRoute[i];

            if (item.DTMF.current === code) {
                return {
                    type: 'currentStation',
                    stationIndex: i,
                    station: item
                }
            }

            if (item.DTMF.next === code) {
                return {
                    type: 'nextStation',
                    stationIndex: i,
                    station: item
                }
            }
        }

        return null;
    }
});