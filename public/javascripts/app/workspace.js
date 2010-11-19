var Workspace = Backbone.Controller.extend({
    routes: {
        ""   : "root",
        "home"   : "root",
        "accounts": "accounts",
        "operations": "operations"
    },

    initialize: function() {
        this.accounts = new AccountsView();
        this.home = new HomeView();
        this.operations = new OperationsView();

        Backbone.history.start();
    },

    root: function() {
        this.home.activate();
    },

    accounts: function() {
        this.accounts.activate();
    },
    
    operations: function() {
        this.operations.activate();
    }
});
