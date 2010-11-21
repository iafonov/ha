OperationsView = Backbone.View.extend({
    el: "#operations",
    rootElement: "#active-window",
    template: "operations/operations",

    initialize: function() {
        this.accounts = AccountsList.get();
        $(this.rootElement).append(JST[this.template]);

        _.bindAll(this, 'render');

        this.accounts.bind('refresh', this.render);
    },

    render: function() {
        console.log("render ops.")
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