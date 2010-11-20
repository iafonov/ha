var Workspace = Backbone.Controller.extend({
    routes: {
        ""   : "root",
        "home"   : "root",
        "accounts": "accounts",
        "operations": "operations"
    },

    current: null,

    initialize: function() {
        this.accounts = new AccountsView();
        this.home = new HomeView();
        this.operations = new OperationsView();

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
    
    operations: function() {
        if (this.current != null) this.current.deactivate();
        this.current = this.operations.activate();
    }
});
