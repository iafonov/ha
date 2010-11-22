TransactionsView = Backbone.ScreenView.extend({
    el: "#transactions",
    rootElement: "#active-window",
    template: "transactions/transactions",

    init: function() {
        this.accounts = AccountsList.get();

        _.bindAll(this, 'render');

        this.accounts.bind('refresh', this.render);
    },

    render: function() {
        console.log("render ops.")
    }
})