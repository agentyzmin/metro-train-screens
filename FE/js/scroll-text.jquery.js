(function($) {
    "use strict";

    $.fn.scrollText = function(val) {
        return this.each(updateItem);

        function updateItem() {
            var $elem = $(this);

            var text, height, $current, $next,
                $content = $elem.find('.b-scrollable-text__content-wrap');

            if (!$content.length) {
                // If element is not converted yet - do it
                $elem.addClass('b-scrollable-text');
                text = $elem.text() || String.fromCharCode(160); // same as &nbsp;
                $content = $('<div class="b-scrollable-text__content-wrap"></div>');
                $current = $('<div class="b-scrollable-text__current"></div>').text(text);
                $next = $('<div class="b-scrollable-text__next"></div>').text(val);

                $content
                    .append($next)
                    .append($current);

                $elem.html($content);

                height = $current.height();
                $content.css({
                    'max-height': height
                });
            } else {
                $current = $elem.find('.b-scrollable-text__current');
                $next = $elem.find('.b-scrollable-text__next');

                height = $content.height();
                $current.text($next.text());
                $next.text(val);
            }

            $next
                .removeClass('animate')
                .css({ 'margin-top': -1 * height });

            setTimeout(function() {
                $next
                    .addClass('animate')
                    .css({ 'margin-top': 0 })
            }, 1);
        }
    }
}(jQuery));