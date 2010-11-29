(function($) {
    $.toggleFlash = function(message, options) {
        if (_(message).isEmpty()) return;

        if ($('#flash').size() == 0) {
            $("body").prepend($("<div />").attr("id", "flash"));
        }

        $('#flash').toggleFlash(message);
    };

    $.fn.toggleFlash = function(message, options) {
        if (_(message).isArray()) {
            message = message.join($("<br />"));
        }

        this.html(message);
        this.slideDown('slow', function() {
            _.delay(function() {
                flash = arguments[0];
                flash.slideUp("slow");
            }, 1000, $(this));
        });
    };
})(jQuery);