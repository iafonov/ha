TransactionsView = Backbone.ScreenView.extend({
    el: "#transactions",
    rootElement: "#active-window",
    template: "transactions/transactions",

    events: {
        "click #create-new-transaction" : "create"
    },

    init: function() {
        _.bindAll(this, 'refreshForm', 'formatCurrency');

        this.accounts = AccountsList.get();
        this.accounts.bind('all',     this.refreshForm);

        this.transactions = TransactionsList.get();

        this.$('#new-transaction-amount').blur(this.formatCurrency);
        this.$("#new-transaction-currency").change(this.formatCurrency);
    },

    refreshForm: function() {
        this.$("#new-transaction-from").html("")
        this.$("#new-transaction-to").html("")
        this.accounts.map(function(account) {   
            $('<option/>').attr("value", account.get("id")).text(account.get("name")).appendTo($("#new-transaction-from"));
            $('<option/>').attr("value", account.get("id")).text(account.get("name")).appendTo($("#new-transaction-to"));
        })
    },

    formatCurrency: function() {
        this.$('#new-transaction-amount').formatCurrency({region: this.$("#new-transaction-currency").val()});
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
                cents:      (-this.$("#new-transaction-amount").asCents())
            }, {
                account_id: this.$("#new-transaction-to").val(),
                currency:   this.$("#new-transaction-currency").val(),
                cents:      this.$("#new-transaction-amount").asCents()
            }]
        };
    },
})