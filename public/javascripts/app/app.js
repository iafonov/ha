Mustache.template = function(templateString) {
    return function() { 
        return Mustache.to_html(templateString, arguments[0], arguments[1]); 
  };
};

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

        Backbone.history.start()
    },

    root: function() {
        this.home.activate();
    },

    accounts: function() {
        this.accounts.activate();
    }
});

$(document).ready(function() {
    workspace = new Workspace();
});