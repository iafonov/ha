Backbone.ScreenView = Backbone.View.extend({
    init: function() {
        // Init method for views
    },

    initialize: function() {
        $(this.rootElement).append(JST[this.template]);

        this.init();
        this.delegateEvents();
    },

    deactivate: function() {
        $(this.el).hide();
        return this;
    },

    activate: function() {
        $(this.el).show();
        return this;
    }
});
