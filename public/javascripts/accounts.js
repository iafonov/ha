window.Account = Backbone.Model.extend({
})

window.AccountsList = Backbone.Collection.extend({
    model: Account,
    url: "/accounts"
})

window.Accounts = new AccountsList;

window.AccountView = Backbone.View.extend({
    tagName:  "li",
    template: _.template($('#item-template').html()),

    events: {
        "dblclick div.account-name"          : "edit",
        "click span.account-destroy"         : "clear",
        "keypress .account-name-input"       : "updateOnEnter"
    },

    initialize: function() {
        _.bindAll(this, 'render', 'close');
        this.model.bind('change', this.render);
        this.model.view = this;
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.setContent();
        return this;
    },

    setContent: function() {
        var name = this.model.get('name');
        this.$('.account-name').text(name);

        this.input = this.$('.account-name-input');
        this.input.bind('blur', this.close);
        this.input.val(name);
    },

    edit: function() {
        $(this.el).addClass("editing");
        this.input.focus();
    },

    close: function() {
        this.model.save({name: this.input.val()});
        $(this.el).removeClass("editing");
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13) this.close();
    },

    clear: function() {
        this.model.clear();
    }
});

window.AppView = Backbone.View.extend({
    el: $("#accounts-manager"),

    events: {
        "keypress #new-account": "createOnEnter",
        "click .todo-clear a"  : "clearCompleted"
    },

    initialize: function() {
        _.bindAll(this, 'addOne', 'addAll', 'render');

        this.input    = this.$("#new-account");

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
            name: this.input.val()
        };
    },

    createOnEnter: function(e) {
        if (e.keyCode != 13) return;
        Accounts.create(this.newAttributes());
        this.input.val('');
    }
});

window.App = new AppView;