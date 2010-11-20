HomeView = Backbone.View.extend({
    el: "#home",
    rootElement: "#active-window",
    template: "home/home",

    initialize: function() {
        $(this.rootElement).append(JST[this.template]);
    },

    deactivate: function() {
        $(this.el).hide();
        return this;
    },

    activate: function() {
        $(this.el).show();
        return this;
    }
})