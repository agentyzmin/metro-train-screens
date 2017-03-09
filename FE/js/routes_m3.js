(function () {
    "use strict";

    var TRANSFER_TO_METRO = {
        ua: 'Перехід на станцію',
        en: 'Transfer to'
    };
    var TRANSFER_TO_URBAN_RAIL = {
        ua: 'Пересадка на міську електричку',
        en: 'Transfer to Urban Rail'
    };

    if (!window.routes) {
        window.routes = {};
    }

    var stations = [];
    routes.m3 = stations;

    function timeToPreviousStation(time) {
        return function () {
            return time;
        }
    }

    function timeToNextStation(time) {
        return function () {
            return time;
        }
    }

    function timeOnPlatform(time) {
        return function () {
            return time;
        }
    }

    stations.push({
        name: {
            ua: 'Сирець',
            en: 'Syrets'
        },
        line: 'm3',
        timeToNextStation: timeToNextStation(110),
        transfer: {
            urbanRail: {
                ua: [TRANSFER_TO_URBAN_RAIL.ua, 'Сирець'],
                en: [TRANSFER_TO_URBAN_RAIL.en, 'Syrets']
            }
        },
        DTMF: {
            next: '0000',
            current: '0106'
        }
    });

    stations.push({
        name: {
            ua: 'Дорогожичі',
            en: 'Dorohozhychi'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(110),
        timeToNextStation: timeToNextStation(175),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0107',
            current: '0108'
        }
    });

    stations.push({
        name: {
            ua: 'Лук’янівська',
            en: 'Lukianivska'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(180),
        timeToNextStation: timeToNextStation(235),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0109',
            current: '0200'
        }
    });

    stations.push({
        name: {
            ua: 'Золоті ворота',
            en: 'Zoloti Vorota'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(200),
        timeToNextStation: timeToNextStation(70),
        timeOnPlatform: timeOnPlatform(30),
        transfer: {
            metro: {
                ua: [TRANSFER_TO_METRO.ua, 'Театральна'],
                en: [TRANSFER_TO_METRO.en, 'Teatralna'],
                route: 'm1'
            }
        },
        DTMF: {
            next: '0201',
            current: '0203'
        }
    });

    stations.push({
        name: {
            ua: 'Палац спорту',
            en: 'Palats Sportu'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(75),
        timeToNextStation: timeToNextStation(105),
        timeOnPlatform: timeOnPlatform(30),
        transfer: {
            metro: {
                ua: [TRANSFER_TO_METRO.ua, 'Площа Льва Толстого'],
                en: [TRANSFER_TO_METRO.en, 'Ploscha Lva Tolstoho'],
                route: 'm2'
            }
        },
        DTMF: {
            next: '0204',
            current: '0205'
        }
    });


    stations.push({
        name: {
            ua: 'Кловська',
            en: 'Klovska'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(95),
        timeToNextStation: timeToNextStation(100),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0206',
            current: '0207'
        }
    });

    stations.push({
        name: {
            ua: 'Печерська',
            en: 'Pecherska'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(100),
        timeToNextStation: timeToNextStation(90),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0208',
            current: '0209'
        }
    });

    stations.push({
        name: {
            ua: 'Дружби народів',
            en: 'Druzhby Narodiv'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(85),
        timeToNextStation: timeToNextStation(125),
        timeOnPlatform: timeOnPlatform(20),
        DTMF: {
            next: '0300',
            current: '0301'
        }
    });

    stations.push({
        name: {
            ua: 'Видубичі',
            en: 'Vydubychi'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(125),
        timeToNextStation: timeToNextStation(360),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            busStation: {
                ua: ['Автостанція «Видубичі»'],
                en: ['Vydubychi Bus Station']
            },
            urbanRail: {
                ua: [TRANSFER_TO_URBAN_RAIL.ua, 'Видубичі'],
                en: [TRANSFER_TO_URBAN_RAIL.en, 'Vydubychi']
            }
        },
        DTMF: {
            next: '0302',
            current: '0304'
        }
    });

    stations.push({
        name: {
            ua: 'Славутич',
            en: 'Slavutych'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(360),
        timeToNextStation: timeToNextStation(75),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0305',
            current: '0306'
        }
    });

    stations.push({
        name: {
            ua: 'Осокорки',
            en: 'Osokorky'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(75),
        timeToNextStation: timeToNextStation(160),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0307',
            current: '0308'
        }
    });

    stations.push({
        name: {
            ua: 'Позняки',
            en: 'Pozniaky'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(150),
        timeToNextStation: timeToNextStation(160),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0309',
            current: '0400'
        }
    });

    stations.push({
        name: {
            ua: 'Харківська',
            en: 'Kharkivska'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(150),
        timeToNextStation: timeToNextStation(90),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            airport: {
                ua: ['Автобус до аеропорту', '«Бориспіль»'],
                en: ['Boryspil (KBP) airport bus']
            }
        },
        DTMF: {
            next: '0401',
            current: '0402'
        }
    });

    stations.push({
        name: {
            ua: 'Вирлиця',
            en: 'Vyrlytsia'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(90),
        timeToNextStation: timeToNextStation(95),
        timeOnPlatform: timeOnPlatform(15),
        exit: 'right',
        DTMF: {
            next: '0403',
            current: '0405'
        }
    });

    stations.push({
        name: {
            ua: 'Бориспільська',
            en: 'Boryspilska'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(100),
        timeToNextStation: timeToNextStation(115),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0406',
            current: '0407'
        }
    });

    stations.push({
        name: {
            ua: 'Червоний хутір',
            en: 'Chervonyi Khutir'
        },
        line: 'm3',
        timeToPreviousStation: timeToPreviousStation(130),
        exit: 'right',
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });
}());
