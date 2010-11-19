OperationsView = Backbone.View.extend({
    el: "#active-window",
    template: "operations/operations",

    initialize: function() {

    },

    activate: function() {
        $(this.el).html(JST[this.template]);
    }
})