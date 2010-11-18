HomeView = Backbone.View.extend({
    el: "#active-window",
    template: "home/home",

    initialize: function() {

    },

    activate: function() {
        $(this.el).html(JST[this.template]);
    }
})