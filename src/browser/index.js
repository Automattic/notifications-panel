/**
 * Module exports.
 */

module.exports = {
    /* This test is for touch events, comes from Modernizr:
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
	 * It may not accurately detect a touch screen, but may be close enough
	 * depending on the use case.
	 */
    hasTouch: function() {
        return 'ontouchstart' in window ||
            (window.DocumentTouch && document instanceof DocumentTouch);
    },
};
