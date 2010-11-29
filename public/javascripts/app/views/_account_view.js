AccountView = Backbone.View.extend({
    tagName:  "li",
    template: "accounts/account_item",

    events: {
        "dblclick span.account-name"          : "edit",
        "click span.destroy"                  : "clear",
        "click span.save"                     : "saveAndClose",
        "click span.cancel"                   : "close",
        "keypress .account-name-input"        : "updateOnEnter"
    },

    initialize: function() {
        _(this).bindAll('render', 'close');
        this.model.bind('change', this.render);
        this.model.view = this;
    },

    render: function() {
        $(this.el).html(JST[this.template](this.model.toJSON()));
        this.setContent();
        return this;
    },

    setContent: function() {
        this.$('.account-name-input').val(this.model.get("name"));
        this.$('.account-currency-input').val(this.model.get("currency"));
        this.$('.account-balance').formatCurrency({region: this.model.get("currency"), cents: true});
    },

    edit: function() {
        $(this.el).addClass("editing");
        this.$('.account-name-input').focus();
    },

    close: function() {
        $(this.el).removeClass("editing");
        this.setContent();
    },

    saveAndClose: function() {
        editElement = $(this.el);
        this.model.save({
            name:     this.$('.account-name-input').val(),
            currency: this.$('.account-currency-input').val()
        }, { success: this.close});
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13) this.saveAndClose();
    },

    clear: function() {
        this.model.clear();
    }
});