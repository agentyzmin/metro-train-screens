jQuery(function($) {
    "use strict";

    var TEXT = {
        ua: 'Система працює у тестовому режимі',
        en: 'System in test mode'
    };

    var currentLang,
        $elem = $('.b-test-mode-warning');

    if (!window.app) {
        window.app = {};
    }

    app.testModeWarning = new TestModeWarning();

    function TestModeWarning() {
    }

    TestModeWarning.prototype.updateText = function(lang) {
        console.log($elem);

        if (lang !== currentLang) {
            $elem.scrollText(TEXT[lang]);
            currentLang = lang;
        }
    };
});