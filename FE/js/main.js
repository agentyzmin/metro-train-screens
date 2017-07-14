jQuery(function($) {
    "use strict";

    var NEXT_STATION_DURATION = 20 * 1000;

    var currentRoute,
        direction = null,
        shortRouteStationIndex = null,
        previousStationIndex = null,
        previousNextStationIndex = null;

    bindInformationalServer();
    new app.screens.SystemInfo();

    function bindInformationalServer() {
        getRoute();

        function getRoute() {
            $
                .post('/get-route')
                .then(function(route) {
                    route = route.toLowerCase();

                    if (routes[route]) {
                        $('body').addClass('b-page_' + route);

                        currentRoute = routes[route];
                        getAction();
                    } else {
                        console.log('Route ' + route + ' is not exits');
                    }
                })
                .catch(function() {
                    console.log('Could not get route');
                });
        }

        function getAction() {
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

                    getAction();
                })
                .catch(function() {
                    console.log('Lost connection to the server');
                    setTimeout(getAction, 1000);
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
            var isEndStation,
                details = decodeDTMF(code);

            clearTimeout(onDTMF.timeout);

            if (!details) {
                return;
            }

            switch (details.type) {
                case 'currentStation':
                    // Check whether the the direction has changed
                    if (previousNextStationIndex !== details.stationIndex) {
                        direction = null;
                    }
                    previousStationIndex = details.stationIndex;
                    previousNextStationIndex = null;


                    // Check whether it is the last station
                    if (
                        direction === 1 && details.stationIndex === (currentRoute.length - 1)
                        ||
                        direction === -1 && details.stationIndex === 0
                    ) {
                        isEndStation = true;
                    } else if (shortRouteStationIndex && details.stationIndex === shortRouteStationIndex) {
                        isEndStation = true;
                        shortRouteStationIndex = null;
                    }

                    new app.screens.StationDetails(details.station, { isEnd: isEndStation });
                    break;


                case 'nextStation':
                    new app.screens.StationDetails(details.station, { isNext: true });

                    if (previousStationIndex !== null && (details.stationIndex - previousStationIndex === 1)) {
                        direction = 1;
                    } else if (previousStationIndex !== null && (details.stationIndex - previousStationIndex === -1)) {
                        direction = -1;
                    } else if (previousStationIndex === null && details.stationIndex === 1) {
                        // On the very first DTMF try to guess the direction
                        previousStationIndex = 0;
                        direction = 1;
                    } else if (previousStationIndex === null && details.stationIndex === currentRoute.length-2) {
                        previousStationIndex = currentRoute.length - 1;
                        direction = -1;
                    } else if (previousNextStationIndex === details.stationIndex) {
                        // Direction should not be changed on double message
                    } else {
                        direction = null;
                    }

                    previousNextStationIndex = details.stationIndex;

                    if (direction) {
                        onDTMF.timeout = setTimeout(function() {
                            new app.screens.StationsList(getNextStations(previousStationIndex, direction));
                        }, NEXT_STATION_DURATION);
                    }
                    break;


                case 'shortRoute':
                    shortRouteStationIndex = details.stationIndex;
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

        for (i = 0; i < currentRoute.length; ++i) {
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
            }

            if (shortRouteStationIndex && shortRouteStationIndex === index) {
                break;
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

            if (item.DTMF.shortRoute === code) {
                return {
                    type: 'shortRoute',
                    stationIndex: i,
                    station: item
                }
            }
        }

        return null;
    }
});
