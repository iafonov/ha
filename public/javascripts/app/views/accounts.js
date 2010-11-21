AccountsView = Backbone.ScreenView.extend({
    el: "#accounts",
    rootElement: "#active-window",
    template: "accounts/accounts",

    events: {
        "keypress #new-account"     : "createOnEnter",
        "click #create-new-account" : "create"
    },

    init: function() {
        _.bindAll(this, 'addOne', 'addAll', 'render');

        this.accounts = AccountsList.get();

        this.accounts.bind('add',     this.addOne);
        this.accounts.bind('refresh', this.addAll);
        this.accounts.bind('all',     this.render);
    },

    addOne: function(account) {
        var view = new AccountView({model: account});
        this.$("#accounts-list").append(view.render().el);
    },

    addAll: function() {
        this.accounts.each(this.addOne);
    },

    newAttributes: function() {
        return {
            name:     this.$("#new-account-name").val(),
            currency: this.$("#new-account-currency").val()
        };
    },

    create: function(e) {
        accountNameInput = this.$("#new-account-name")
        this.accounts.create(this.newAttributes(), { success: function() {
            accountNameInput.val('');
        }});
    },

    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        this.create();
    }
});