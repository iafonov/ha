TransactionsView = Backbone.ScreenView.extend({
    el: "#transactions",
    rootElement: "#active-window",
    template: "transactions/transactions",

    events: {
        "click #create-new-transaction" : "create"
    },

    init: function() {
        _(this).bindAll('addOne', 'addAll', 'refreshForm', 'formatCurrency');

        this.accounts = AccountsList.get();
        this.accounts.bind('all',     this.refreshForm);

        this.transactions = TransactionsList.get();
        this.transactions.bind('add',     this.addOne);
        this.transactions.bind('refresh', this.addAll);
        this.transactions.bind('all',     this.render);

        this.$('#new-transaction-amount').blur(this.formatCurrency);
        this.$("#new-transaction-currency").change(this.formatCurrency);
    },

    addOne: function(transaction) {
        var view = new TransactionView({model: transaction});
        this.$("#transactions-list").append(view.render().el);
    },

    addAll: function() {
        this.transactions.each(this.addOne);
    },

    refreshForm: function() {
        this._fillAccountsSelect(this.$("#new-transaction-from"));
        this._fillAccountsSelect(this.$("#new-transaction-to"));
    },

    formatCurrency: function() {
        this.$('#new-transaction-amount').formatCurrency({region: this.$("#new-transaction-currency").val()});
    },

    create: function() {
        this.transactions.create(this.newAttributes());
    },

    newAttributes: function() {
        var accountFrom = this.accounts.get(this.$("#new-transaction-from").val());
        var accountTo = this.accounts.get(this.$("#new-transaction-to").val());

        var currency = this.$("#new-transaction-currency").val();
        var currencyFrom = accountFrom.get("currency");
        var currencyTo = accountTo.get("currency");

        var centsFrom = Bank.get().exchange(-this.$("#new-transaction-amount").asCents(), currency, currencyFrom);
        var centsTo   = Bank.get().exchange( this.$("#new-transaction-amount").asCents(), currency, currencyTo);

        return {
            comment:  this.$("#new-transaction-comment").val(),
            operations: [{
                account_id: accountFrom.id,
                currency:   currencyFrom,
                cents:      centsFrom
            }, {
                account_id: accountTo.id,
                currency:   currencyTo,
                cents:      centsTo
            }]
        };
    },

    _fillAccountsSelect: function(select) {
        select.html("");
        this.accounts.map(function(account) {
            caption = _.template("{{name}} ({{currency}})", account.attributes);
            $('<option/>').attr("value", account.get("id")).text(caption).appendTo(select);
        });
    }
});