OperationsView = Backbone.View.extend({
    el: "#operations",
    rootElement: "#active-window",
    template: "operations/operations",

    initialize: function() {
        this.accounts = AccountsList.get();
        $(this.rootElement).append(JST[this.template]);
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
        console.log(this.accounts.models)
//        $(this.el).html(JST[this.template](this.accounts.toJSON()));
    }
})