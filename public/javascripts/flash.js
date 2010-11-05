(function($) {
    $.toggleFlash = function(message, options) {
        if (_.isEmpty(message)) return

        if ( $('#flash').size() == 0 ) {
            $("body").prepend('<div id="flash"></div>');
        }

        $('#flash').toggleFlash(message);
    };

    $.fn.toggleFlash = function(message, options) {
        if (_.isArray(message)) {
            message = message.join("<br />")
        }

        this.html(message)
        this.slideDown('slow', function() {
            _.delay(function() {
                flash = arguments[0]
                flash.slideUp("slow")
            }, 1000, $(this))
            
        });
	};
})(jQuery);