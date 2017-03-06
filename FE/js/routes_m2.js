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
    routes.m2 = stations;

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
            ua: 'Героїв Дніпра',
            en: 'Heroiv Dnipra'
        },
        line: 'm2',
        timeToNextStation: timeToNextStation(110),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Мінська',
            en: 'Minska'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(110),
        timeToNextStation: timeToNextStation(80),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Оболонь',
            en: 'Obolon'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(95),
        timeToNextStation: timeToNextStation(115),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Петрівка',
            en: 'Petrivka'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(115),
        timeToNextStation: timeToNextStation(135),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            urbanRail: {
                ua: [TRANSFER_TO_URBAN_RAIL.ua, 'Київ-Петрівка'],
                en: [TRANSFER_TO_URBAN_RAIL.en, 'Kyiv-Petrivka']
            }
        },
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Тараса Шевченка',
            en: 'Tarasa Shevchenka'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(125),
        timeToNextStation: timeToNextStation(105),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Контрактова площа',
            en: 'Kontraktova Ploscha'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(120),
        timeToNextStation: timeToNextStation(75),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Поштова площа',
            en: 'Poshtova Ploscha'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(75),
        timeToNextStation: timeToNextStation(95),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            funicular: {
                ua: ['Фунікулер'],
                en: ['Фунікулер']
            }
        },
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Майдан Незалежності',
            en: 'Maidan Nezalezhnosti'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(95),
        timeToNextStation: timeToNextStation(95),
        timeOnPlatform: timeOnPlatform(30),
        transfer: {
            metro: {
                ua: [TRANSFER_TO_METRO.ua, 'Хрещатик'],
                en: [TRANSFER_TO_METRO.en, 'Khreschatyk'],
                route: 'm1'
            }
        },
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Площа Льва Толстого',
            en: 'Ploscha Lva Tolstoho'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(95),
        timeToNextStation: timeToNextStation(85),
        timeOnPlatform: timeOnPlatform(30),
        transfer: {
            metro: {
                ua: [TRANSFER_TO_METRO.ua, 'Палац спорту'],
                en: [TRANSFER_TO_METRO.en, 'Palats Sportu'],
                route: 'm3',
                screen: 1
            },
            airport: {
                ua: ['Автобус до аеропорту', '«Київ» (Жуляни)'],
                en: ['Kyiv (IEV) airport bus'],
                screen: 1
            }
        },
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Олімпійська',
            en: 'Olimpiiska'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(75),
        timeToNextStation: timeToNextStation(80),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Палац «Україна»',
            en: 'Palats Ukraina'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(80),
        timeToNextStation: timeToNextStation(75),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Либідська',
            en: 'Lybidska'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(70),
        timeToNextStation: timeToNextStation(90),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Деміївська',
            en: 'Demiivska'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(90),
        timeToNextStation: timeToNextStation(85),
        timeOnPlatform: timeOnPlatform(15),
        transfer: {
            busStation: {
                ua: ['Центральинй автовокзал'],
                en: ['Tsentralnyi (Central) Bus Station']
            }
        },
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Голосіївська',
            en: 'Holosiivska'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(80),
        timeToNextStation: timeToNextStation(125),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Васильківська',
            en: 'Vasylkivska'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(115),
        timeToNextStation: timeToNextStation(180),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Виставковий центр',
            en: 'Vystavkovyi Tsentr'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(180),
        timeToNextStation: timeToNextStation(80),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Іподром',
            en: 'Ipodrom'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(80),
        timeToNextStation: timeToNextStation(125),
        timeOnPlatform: timeOnPlatform(15),
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });

    stations.push({
        name: {
            ua: 'Теремки',
            en: 'Teremky'
        },
        line: 'm2',
        timeToPreviousStation: timeToPreviousStation(130),
        transfer: {
            busStation: {
                ua: ['Автостанція «Теремки»'],
                en: ['Teremky Bus Station']
            }
        },
        DTMF: {
            next: '0000',
            current: '0000'
        }
    });
}());
