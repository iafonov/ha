AccountsView = new (Backbone.View.extend({
    el: $("#accounts-manager"),

    events: {
        "keypress #new-account"     : "createOnEnter",
        "click #create-new-account" : "create",
        "click .todo-clear a"       : "clearCompleted"
    },

    initialize: function() {
        _.bindAll(this, 'addOne', 'addAll', 'render');

        Accounts.bind('add',     this.addOne);
        Accounts.bind('refresh', this.addAll);
        Accounts.bind('all',     this.render);

        Accounts.fetch();
    },

    addOne: function(account) {
        var view = new AccountView({model: account});
        this.$("#accounts-list").append(view.render().el);
    },

    addAll: function() {
        Accounts.each(this.addOne);
    },

    newAttributes: function() {
        return {
            name:     this.$("#new-account-name").val(),
            currency: this.$("#new-account-currency").val()
        };
    },

    create: function(e) {
        accountNameInput = this.$("#new-account-name")
        Accounts.create(this.newAttributes(), { success: function() {
            accountNameInput.val('');
        }});
    },

    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        this.create()
    }
}));