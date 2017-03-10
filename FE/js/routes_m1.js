(function() {
    "use strict";

    var TRANSFER_TO_TRAM = {
        ua: 'Поруч',
        en: 'Access to'
    };
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
    routes.m1 = stations;

    function timeToPreviousStation(time) {
        return function() {
            return time;
        }
    }

    function timeToNextStation(time) {
        return function() {
            return time;
        }
    }

    function timeOnPlatform(time) {
        return function() {
            return time;
        }
    }

    stations.push({
        name: {
            ua: 'Академмістечко',
            en: 'Akademmistechko'
        },
        line: 'm1',
        timeToNextStation: timeToNextStation(125),
        DTMF: {
            next: '0502',
            current: '0503'
        }
    });

    stations.push({
        name: {
            ua: 'Житомирська',
            en: 'Zhytomyrska'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(150),
        timeToNextStation: timeToNextStation(150),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0500',
            current: '0501'
        }
    });

    stations.push({
        name: {
            ua: 'Святошин',
            en: 'Sviatoshyn'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(165),
        timeToNextStation: timeToNextStation(85),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0408',
            current: '0409'
        },
        transfer: {
            trainStation: {
                ua: [TRANSFER_TO_TRAM.ua, 'Святошин'],
                en: [TRANSFER_TO_TRAM.en, 'Sviatoshyn railway station']
            }
        }
    });

    stations.push({
        name: {
            ua: 'Нивки',
            en: 'Nyvky'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(90),
        timeToNextStation: timeToNextStation(85),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0406',
            current: '0407'
        }
    });

    stations.push({
        name: {
            ua: 'Берестейська',
            en: 'Beresteiska'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(90),
        timeToNextStation: timeToNextStation(170),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            urbanRail: {
                ua: [TRANSFER_TO_URBAN_RAIL.ua, 'Рубежівський'],
                en: [TRANSFER_TO_URBAN_RAIL.en, 'Rubezhivskyi']
            }
        },
        DTMF: {
            next: '0403',
            current: '0405'
        }
    });

    stations.push({
        name: {
            ua: 'Шулявська',
            en: 'Shuliavska'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(155),
        timeToNextStation: timeToNextStation(95),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0401',
            current: '0402'
        }
    });

    stations.push({
        name: {
            ua: 'Політехнічний інститут',
            en: 'Politekhnichnyi Instytut'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(95),
        timeToNextStation: timeToNextStation(105),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            trams: {
                ua: [TRANSFER_TO_TRAM.ua, 'Політехнічна'],
                en: [TRANSFER_TO_TRAM.en, 'Politekhnichnа'],
                routes: ['T3']
            }
        },
        DTMF: {
            next: '0309',
            current: '0400'
        }
    });

    stations.push({
        name: {
            ua: 'Вокзальна',
            en: 'Vokzalna'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(155),
        timeToNextStation: timeToNextStation(95),
        timeOnPlatform: timeOnPlatform(25),
        transfer: {
            trainStation: {
                ua: ['Вокзали', 'Центральний, Південний'],
                en: ['Long distance trains'],
                screen: 1
            },
            airport: {
                ua: ['Автобус до аеропорту', '«Бориспіль»'],
                en: ['Boryspil (KBP) airport bus'],
                screen: 1
            },
            busStation: {
                ua: ['Автостанція «Київ»'],
                en: ['Kyiv Bus Station'],
                screen: 2
            },
            urbanRail: {
                ua: ['Київ-Пасажирський'],
                en: ['Kyiv-Pasazhyrskyi'],
                screen: 2
            },
            trams: {
                ua: ['Старовокзальна'],
                en: ['Starovokzalna'],
                routes: ['T3'],
                screen: 2
            }
        },
        DTMF: {
            next: '0307',
            current: '0308'
        }
    });

    stations.push({
        name: {
            ua: 'Університет',
            en: 'Universytet'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(95),
        timeToNextStation: timeToNextStation(90),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0305',
            current: '0306'
        }
    });

    stations.push({
        name: {
            ua: 'Театральна',
            en: 'Teatralna'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(85),
        timeToNextStation: timeToNextStation(90),
        timeOnPlatform: timeOnPlatform(30),
        transfer: {
            metro: {
                ua: [TRANSFER_TO_METRO.ua, 'Золоті ворота'],
                en: [TRANSFER_TO_METRO.en, 'Zoloti Vorota'],
                route: 'm3'
            }
        },
        DTMF: {
            next: '0302',
            current: '0304'
        }
    });

    stations.push({
        name: {
            ua: 'Хрещатик',
            en: 'Khreshchatyk'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(85),
        timeToNextStation: timeToNextStation(130),
        timeOnPlatform: timeOnPlatform(30),
        transfer: {
            metro: {
                ua: [TRANSFER_TO_METRO.ua, 'Майдан Незалежності'],
                en: [TRANSFER_TO_METRO.en, 'Maidan Nezalezhnosti'],
                route: 'm2'
            }
        },
        DTMF: {
            next: '0300',
            current: '0301'
        }
    });

    stations.push({
        name: {
            ua: 'Арсенальна',
            en: 'Arsenalna'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(145),
        timeToNextStation: timeToNextStation(90),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0208',
            current: '0209'
        }
    });

    stations.push({
        name: {
            ua: 'Дніпро',
            en: 'Dnipro'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(150),
        timeToNextStation: timeToNextStation(130),
        timeOnPlatform: timeOnPlatform(10),
        DTMF: {
            next: '0206',
            current: '0207'
        },
        exit: 'right'
    });

    stations.push({
        name: {
            ua: 'Гідропарк',
            en: 'Hidropark'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(115),
        timeToNextStation: timeToNextStation(135),
        timeOnPlatform: timeOnPlatform(10),
        DTMF: {
            next: '0204',
            current: '0205'
        }
    });

    stations.push({
        name: {
            ua: 'Лівобережна',
            en: 'Livoberezhna'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(135),
        timeToNextStation: timeToNextStation(100),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            urbanRail: {
                ua: [TRANSFER_TO_URBAN_RAIL.ua, 'Лівобережна'],
                en: [TRANSFER_TO_URBAN_RAIL.en, 'Livoberezhna']
            }
        },
        DTMF: {
            next: '0201',
            current: '0203'
        }
    });

    stations.push({
        name: {
            ua: 'Дарниця',
            en: 'Darnytsia'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(100),
        timeToNextStation: timeToNextStation(125),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0109',
            current: '0200',
            shortRoute: '0701'
        }
    });

    stations.push({
        name: {
            ua: 'Чернігівська',
            en: 'Chernihivska'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(125),
        timeToNextStation: timeToNextStation(115),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0107',
            current: '0108'
        }
    });

    stations.push({
        name: {
            ua: 'Лісова',
            en: 'Lisova'
        },
        line: 'm1',
        timeToPreviousStation: timeToPreviousStation(105),
        DTMF: {
            next: '0105',
            current: '0106'
        }
    });
}());
