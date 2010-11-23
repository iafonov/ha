TransactionsView = Backbone.ScreenView.extend({
    el: "#transactions",
    rootElement: "#active-window",
    template: "transactions/transactions",

    events: {
        "click #create-new-transaction" : "create"
    },

    init: function() {
        this.accounts = AccountsList.get();
        this.transactions = TransactionsList.get();

        _.bindAll(this, 'refreshForm');

        this.accounts.bind('all',     this.refreshForm);
    },

    refreshForm: function() {
        this.$("#new-transaction-from").html("")
        this.$("#new-transaction-to").html("")
        this.accounts.map(function(account) {   
            $('<option/>').attr("value", account.get("id")).text(account.get("name")).appendTo($("#new-transaction-from"));
            $('<option/>').attr("value", account.get("id")).text(account.get("name")).appendTo($("#new-transaction-to"));
        })
    },

    create: function() {
        this.transactions.create(this.newAttributes());
    },

    newAttributes: function() {
        return {
            comment:  this.$("#new-transaction-comment").val(),
            operations_attributes: [{
                account_id: this.$("#new-transaction-from").val(),
                currency:   this.$("#new-transaction-currency").val(),
                cents:      this.$("#new-transaction-amount").val()
            }, {
                account_id: this.$("#new-transaction-to").val(),
                currency:   this.$("#new-transaction-currency").val(),
                cents:      (-this.$("#new-transaction-amount").val()).toString()
            }]
        };
    }
})