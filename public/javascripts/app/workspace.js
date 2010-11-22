var Workspace = Backbone.Controller.extend({
    routes: {
        ""   : "root",
        "home"   : "root",
        "accounts": "accounts",
        "transactions": "transactions"
    },

    current: null,

    initialize: function() {
        this.accounts = new AccountsView();
        this.home = new HomeView();
        this.transactions = new TransactionsView();

        Backbone.history.start();
    },

    root: function() {
        if (this.current != null) this.current.deactivate();
        this.current = this.home.activate();
    },

    accounts: function() {
        if (this.current != null) this.current.deactivate();
        this.current = this.accounts.activate();
    },
    
    transactions: function() {
        if (this.current != null) this.current.deactivate();
        this.current = this.transactions.activate();
    }
});
