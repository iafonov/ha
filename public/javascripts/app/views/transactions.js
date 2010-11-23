TransactionsView = Backbone.ScreenView.extend({
    el: "#transactions",
    rootElement: "#active-window",
    template: "transactions/transactions",

    init: function() {
        this.accounts = AccountsList.get();

        _.bindAll(this, 'refreshForm');

        this.accounts.bind('all',     this.refreshForm);
    },

    refreshForm: function() {
        this.$("#new-transaction-from").html("")
        this.$("#new-transaction-to").html("")
        this.accounts.map(function(account) {   
            $('<option/>').attr("id", account.get("id")).text(account.get("name")).appendTo($("#new-transaction-from"));
            $('<option/>').attr("id", account.get("id")).text(account.get("name")).appendTo($("#new-transaction-to"));
        })
    }
})