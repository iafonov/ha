OperationsView = Backbone.ScreenView.extend({
    el: "#operations",
    rootElement: "#active-window",
    template: "operations/operations",

    init: function() {
        this.accounts = AccountsList.get();

        _.bindAll(this, 'render');

        this.accounts.bind('refresh', this.render);
    },

    render: function() {
        console.log("render ops.")
    }
})