Account = Backbone.Model.extend({
    initialize: function() {
        this.set({balance: this.get("balance_in_cents")})
    },

    removeElement: function() {
        $(this.view.el).remove();
    },

    clear: function() {
        self = this;
        this.destroy({success: function() {
            $(self.view.el).remove();
        }});
    }
})
