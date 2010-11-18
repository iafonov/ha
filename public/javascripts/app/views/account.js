AccountView = Backbone.View.extend({
    tagName:  "li",
    template: "account",

    events: {
        "dblclick span.account-name"          : "edit",
        "click span.destroy"                  : "clear",
        "click span.save"                     : "saveAndClose",
        "click span.cancel"                   : "close",
        "keypress .account-name-input"        : "updateOnEnter"
    },


    render: function() {
        $(this.el).html(JST[this.template](this.model.toJSON()))
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