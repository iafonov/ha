Account = Backbone.Model.extend({
    clear: function() {
        self = this;
        this.destroy({success: function() {
            $(self.view.el).remove();
        }});
    }
})

AccountsList = Backbone.Collection.extend({
    model: Account,
    url: "/accounts"
})

Accounts = new AccountsList;

AccountView = Backbone.View.extend({
    tagName:  "li",
    template: $('#item-template').html(),

    events: {
        "dblclick span.account-name"          : "edit",
        "click span.destroy"                  : "clear",
        "click span.save"                     : "saveAndClose",
        "click span.cancel"                   : "close",
        "keypress .account-name-input"        : "updateOnEnter"
    },

    initialize: function() {
        _.bindAll(this, 'render', 'close');
        this.model.bind('change', this.render);
        this.model.view = this;
    },

    render: function() {
        $(this.el).html(Mustache.to_html(this.template, this.model.toJSON()));
        this.setContent();
        return this;
    },

    setContent: function() {
        this.$('.account-name-input').val(this.model.get("name"));
        this.$('.account-currency-input').val(this.model.get("currency"));
    },

    edit: function() {
        $(this.el).addClass("editing");
        this.input.focus();
    },

    close: function() {
        $(this.el).removeClass("editing");
        this.setContent();
    },

    saveAndClose: function() {
        editElement = $(this.el)
        this.model.save({
            name:     this.$('.account-name-input').val(),
            currency: this.$('.account-currency-input').val()
        }, { success: function() { editElement.removeClass("editing"); }})
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13) this.saveAndClose();
    },

    clear: function() {
        this.model.clear();
    }
});

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
